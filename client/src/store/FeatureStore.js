import {create} from "zustand"
import axios from "axios";

const FeatureStore = create((set)=>({
    FeaturesList:null,
    FeaturesListRequest:async ()=>{
        let res = await axios.get("/api/FeaturesList")
        if (res.data["status"]==="Success"){
            set({FeaturesList:res.data["data"]})
        }
    },
    LegalDetails:null,
    LegalDetailsRequest:async (type)=>{
        set({LegalDetails:null})
        let res = await axios.get(`/api/LegalDetails/${type}`)
        if (res.data["status"]==="Success"){
            set({LegalDetails:res.data["data"]})
        }
    }
}))
export default FeatureStore