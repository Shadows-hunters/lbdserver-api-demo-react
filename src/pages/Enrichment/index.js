import React from 'react'
import Viewer from '../../components/Viewer'
import { useRecoilValue, useRecoilState } from "recoil";
import { datasets as d, project as p, selectedElements as s } from "../../atoms"
import { useState, useEffect } from 'react'
import {FormControl, Radio, FormLabel, RadioGroup, FormControlLabel, Button} from '@mui/material'
import {LbdDataset, LbdConcept} from 'lbdserver-client-api'
import { getDefaultSession, login, Session } from '@inrupt/solid-client-authn-browser';
import { extract } from "../../util/functions";
import { DCTERMS, LDP, RDFS } from '@inrupt/vocab-common-rdf'
import {v4} from "uuid"
const index = () => {
  return (
    <div id="enrichmentViewer">
      <Viewer parentNode="enrichmentViewer"></Viewer>
      <Enricher />
    </div>
  )
}

const Enricher = () => {
  const [selectedElements, setSelectedElements] = useRecoilState(s)
  const project = useRecoilValue(p)
  const [datasets, setDatasets] = useState([])
  const [mainDataset, setMainDataset] = useState()

  useEffect(() => {
    getAllDatasets()
  }, [])

  async function getAllDatasets() {
    const allDatasets = await project.getAllDatasetUrls()
    const loaded = {}
    for (const ds of allDatasets) {
      const myDs = new LbdDataset(getDefaultSession(), ds)
      await myDs.init()
      loaded[ds] = { dataset: myDs, active: false }
    }
    setDatasets(loaded)
  }

  function setDataSetToEnrich(ds) {
    setMainDataset(ds)
  }

  async function enrich() {
    try {
      const distr = mainDataset.getDistributions()
      let damagedItemAlias

      // should check if the concept already has an identifier in this distribution / dataset





      damagedItemAlias = mainDataset.url + "#" + v4()
      const damageAlias = mainDataset.url + "#damage_" + v4()
      const newSel = new Set()
      for (const dist of distr) {
        const query = `INSERT DATA {
          <${damagedItemAlias}> <https://w3id.org/dot#hasDamage> <${damageAlias}> .
        }`
        await project.dataService.sparqlUpdate(dist.url, query)
        for (const element of selectedElements) {
          const c = new LbdConcept(getDefaultSession(), project.getReferenceRegistry())
          c.init(JSON.parse(JSON.stringify({aliases: element.aliases, references: element.references})))
          await c.addReference(damagedItemAlias, mainDataset.url, dist.url)
          newSel.add(c)
          console.log('c', c)
        }
      }
      setSelectedElements(() => Array.from(newSel))
    } catch (error) {
      console.log('error', error)
    }

  }


  return <div>
    <h4>The enrichment module</h4>

    <FormControl >
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={mainDataset && mainDataset.url}
      >
        {Object.keys(datasets).map(ds => {
          return <DatasetInfo key={ds} dataset={datasets[ds]} toggle={setDataSetToEnrich} active={mainDataset && (datasets[ds].dataset.url === mainDataset.url)}/>
        })}
      </RadioGroup>
      <Button onClick={async () => {await enrich()}} disabled={!mainDataset || selectedElements.length == 0}>SET DAMAGE</Button>
    </FormControl>
  </div>
}

function DatasetInfo(props) {
  const {dataset} = props.dataset

  function makeLabel() {
      const label = extract(dataset.data, dataset.url)[RDFS.label][0]["@value"]
      const creator = extract(dataset.data, dataset.url)[DCTERMS.creator][0]["@id"]
      return `${label} - ${creator}`
  }

  return <FormControlLabel value={dataset.url} onChange={()=>props.toggle(dataset)} control={<Radio checked={props.active}/>} label={makeLabel()} />
}


export default index