import '../css/NurPatientList.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { url } from '../config';
import { useAtomValue, useAtom,useSetAtom } from 'jotai';
import { admAtom, accessTokenAtom, usernameAtom,tokenAtom} from '../config/Atom.js';
import NurPatientInfo from './NurPatientInfo';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

const NurPatientList = () => {
    // 1. 상태에 따라 환자 리스트가 다르게 보임
    // 2. 입원한 환자 리스트 가져오기 (admission table)
    const [fetched, setFetched] = useState(false); // 데이터를 이미 가져왔는지 여부를 나타내는 상태 변수
    const [admList,setAdmList] = useState([]);
    const username = useAtomValue(usernameAtom);
    const accessToken = useAtomValue(accessTokenAtom);
    const setAdmissionPatient = useSetAtom(admAtom); // jotai의 useSetAtom 사용
    const navigate = useNavigate();
    const count = 1;
    function patInfo(admission) {
        setAdmissionPatient(admission);
        console.log(admission);
       console.log(JSON.stringify(admission+"이 전송됩니다. 기둘"))
        navigate(`/nurPatientInfo/${admission.admissionNum}`);
    }


    const [admission, setAdmission] = useState({
        admissionNum: '',
        patNum:'',
        patName:'',
        admissionDueDate:'',
        admissionDate:'',
        docDepartmentName:'',
        admissionReason:'',
        admissionHandover:'',
        admissionDoctorOpinion:'',
        admissionDisChargeOpinion:'',
        docName:'',
        bedsNum:'',
        admissionDischargeDueDate:'',
        admissionDischargeDate:'',
        admissionState:'',
    })
    useEffect(()=>{
        console.log("nurPatientList redirect");
        if(username==='') return;
       
        console.log(`${url}/wardPatientList?nurNum=${username}`);
        axios.get(`${url}/wardPatientList?nurNum=${username}`, {headers: {Authorization: accessToken}, params: {nurNum:username},maxReirects:0})
        .then(response=>{ 
            console.log(username);
            console.log("이 데이터는 말입니다: "+JSON.stringify(response.data));
            console.log("react's token: "+accessToken);
            // setAdmList([...JSON.stringify(response.data)]);
            const data = response.data[0];
            // setAdmission({
            //     admissionNum: data.admission.admissionNum,
            //     patName:data.patName,
            //     patNum: data.admission.patNum,
            //     admissionDueDate: data.admission.admissionDueDate,
            //     admissionDate: data.admission.admissionDate,
            //     docDepartmentName: data.docDepartment,
            //     docName: data.docName,
            //     bedsNum: data.admission.bedsNum,
            //     admissionDischargeDueDate: data.admission.admissionDischargeDueDate,
            //     admissionDischargeDate: data.admission.admissionDischargeDate,
            //     admissionState: data.admission.admissionStatus,
            // });
            const mappedData = response.data.map(data=>({
                admissionNum: data.admission.admissionNum,
                patName:data.patName,
                patNum: data.admission.patNum,
                admissionDueDate: data.admission.admissionDueDate,
                admissionDate: data.admission.admissionDate,
                docDepartmentName: data.docDepartment,
                admissionReason:data.admission.admissionReason,
                admissionHandover:data.admissionHandover,
                admissionDoctorOpinion:data.admission.admissionDoctorOpinion,
                admissionDisChargeOpinion:data.admission.admissionDisChargeOpinion,
                docName: data.docName,
                bedsNum: data.admission.bedsNum,
                admissionDischargeDueDate: data.admission.admissionDischargeDueDate,
                admissionDischargeDate: data.admission.admissionDischargeDate,
                admissionState: data.admission.admissionStatus,
            }));
            setAdmList(mappedData);
            setFetched(true);
        })
        .catch(err => {
            console.log(JSON.stringify(err));
            console.log("react's failedtoken: "+accessToken);
            console.error("error:"+err);
        })
       
    },[count]);
    // jotai 
    // 토큰 세션스토리지에 넣으렴 .
    
    
    return (
        <>

        <div className="background">
            <div id="Lbox" style={{backgroundColor:"white"}}>
            <br/>
                <div id="LboxHeader" 
                >
                <img id="boxIcon" style={{marginTop:"-5px"}} src="./img/notice.png"/> &nbsp;&nbsp;
                <h3 id="boxHeader">입퇴원 조회
                </h3>
                </div>
                <div className="searchLine">
                    <select id="status"> 
                        <option> 상태 </option>
                        <option id="wait"> 대기 중 </option>
                        <option id="ing"> 입원 중 </option>
                        <option id="exit"> 퇴원 </option>
                    </select>
                    <div className="searchbar">
                    <select id="keywordSort">
                    <option>구분</option>
                        <option>입원 번호</option>
                        <option>환자 번호</option>
                        <option>환자 이름(성별/나이)</option>
                        <option>입원 예정일</option>
                        <option>입원일</option>
                        <option>담당과</option>
                        <option>주치의</option>
                        <option>퇴원 예정일</option>
                        <option>퇴원일</option>

                        </select>&nbsp;|<input type="text"  id="keyword" placeholder=' 검색...'/>
                        <label id="searchButton" htmlFor="searchButton1"><button id="searchButton1"> </button></label>            
                    </div>
         
                </div>
                <br/>
                <br/>
                <br/><br/>
                <table className="admList" borderless>
                    <tr>
                        <th>입원 번호</th>
                        <th>환자 번호</th>
                        <th>환자 이름(성별/나이)</th>
                        <th>입원 예정일</th>
                        <th>입원일</th>
                        <th>담당과</th>
                        <th>담당의</th>
                        <th>병실 일련 번호</th>
                        <th>퇴원 예정일</th>
                        <th>퇴원일</th>
                        <th>상태</th>
                    </tr>
                    <tbody>
                    <tr id="line"> 
                    </tr><br/>
                    {admList.map(admission =>(
                                <tr className="patList" key={admission.admNum} 
                                onClick={()=>patInfo(admission)}>

                            <td>{admission.admissionDate}</td>
                        <td>{admission.patNum}</td>
                        <td>{admission.patName}</td>
                        <td>{admission.admissionDueDate}</td>
                        <td>{admission.admissionDate}</td>
                        <td>{admission.docDepartmentName}</td>
                        <td>{admission.docName}</td>
                        <td>{admission.bedsNum}</td>
                        <td>{admission.admissionDischargeDueDate}</td>
                        <td>{admission.admissionDischargeDate}</td>
                        <td>{admission.admissionState}</td>
                    </tr>))}
                    </tbody>
                </table>
                </div>
            </div>
            </>
    );
}
export default NurPatientList;