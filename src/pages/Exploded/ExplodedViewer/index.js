import React, { useState, useEffect } from "react";
import Viewer from "./Viewer";
import { AGGREGATOR_ENDPOINT } from '../../../constants';
import { extract, createReferences } from '../../../util/functions';
import { DCAT, DCTERMS, LDP, RDFS } from '@inrupt/vocab-common-rdf'
import { useRecoilState, useRecoilValue } from 'recoil'
import { project as p, datasets as d, selectedElements as s} from "../../../atoms"
import {getDefaultSession} from '@inrupt/solid-client-authn-browser'

const LBDviewer = () => {
  const [models, setModels] = useState("")
  const [dataset, setDataset] = useState("")
  const [selectedElements, setSelectedElements] = useRecoilState(s)
  const [selection, setSelection] = useState([])
  const project = useRecoilValue(p)
  const datasets = useRecoilValue(d)

  useEffect(() => {
    setActiveDatasets()
  }, [selectedElements])

  async function setActiveDatasets() {
    const active = selectedElements.map(concept => concept.references).flat().map(item => item.distribution)
    const m = []
    const fetched = []
    console.log('active', active)
    for (const url of active) {
      if (!fetched.includes(url)) {
        const ct = await getDefaultSession().fetch(url, {method: "HEAD"}).then(res => res.headers.get('Content-Type'))
        fetched.push(url)
        if (ct === "model/gltf+json") {
          m.push(url)
        }
      }
    }
    console.log('m', m)
    setModels(m)
    // for (const ds of activeDatasets) {
    //   // only one distribution per dataset at this point
    //   const mainDistribution = extract(ds.dataset.data, ds.dataset.url)[DCAT.distribution].map(d => d["@id"])[0]
    //   const mime = extract(ds.dataset.data, mainDistribution)["http://www.w3.org/ns/dcat#mediaType"].map(d => d["@id"])[0]
    //   if (mime.includes("gltf")) {
    //     const url = extract(ds.dataset.data, mainDistribution)[DCAT.downloadURL].map(d => d["@id"])[0]
    //     model = url
    //   }
    // }
    // return {model, dataset}
  }

  // useEffect(() => {
  //   const {model: distribution} = setActiveDatasets()
  //   const filtered = []
  //   selectedElements.forEach(item => {
  //     item.references.forEach(ref => {
  //       if (ref.distribution == distribution) {
  //         filtered.push(ref.identifier)
  //       }
  //     })
  //   })
  //   setSelection(prev => filtered)
  // }, [selectedElements])

  // async function onSelect(sel) {
  //   setSelectedElements(prev => [])
  //   for (const s of sel) {
  //     const concept = await project.getConceptByIdentifier(s, dataset, model)
  //     console.log('concept', concept)
  //     if (concept) {
  //       setSelectedElements(prev => [...prev, concept])
  //     }
  //   }
  //   setSelection(sel)
  // }

  return (
    <div>
      {models.length > 0 ? (
        <div>
        <Viewer
          height={1300}
          models={models}
          projection={"perspective"}
          onSelect={console.log}
          selection={selection}
        />
        </div>
      ) : (
        <div>
          <p style={{ paddingTop: "10%" }}>No glTF models selected </p>
        </div>
      )}
    </div>
  );
};

export default LBDviewer;
