import { useState, useEffect } from 'react'
// import { CgFileDocument } from 'react-icons/cg'
import { HiOutlineDocumentDownload } from 'react-icons/hi'

import { pdf } from '@react-pdf/renderer'
import { saveAs } from "file-saver";
import PdfReport from "../pdf_report_files/pdfReport";

import { useData } from '../components/DataContext';
import { timeConvert } from '../components/myFunctions';
import { IconButton } from "@mui/material";


export default function PdfCard (props) {
  const timeCalc = props.timeCalc;
  const finalCalcList = props.finalCalcList;
  const title = props.title;

  const { sharedVariable } = useData();
  const timeCalcList = createTimeCalcList();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    props.readyState(true);
  }, []);

  function createTimeCalcList () {
    let idCnt = 0;
    let timeVal = '';

    if (timeCalc.dCountry === '') {
      timeVal = timeConvert(timeCalc.countryTimes.domCountry1Start, timeCalc.countryTimes.domCountry1End);
      // eslint-disable-next-line
      var timeTableList = [{
        id: idCnt++, 
        Country: timeCalc.country, 
        Start: timeCalc.countryTimes.domCountry1Start.format('YYYY-MM-DD HH:mm'), 
        End: timeCalc.countryTimes.domCountry1End.format('YYYY-MM-DD HH:mm'), 
        Time: timeVal, 
        Qty: timeCalc.dCountryDiet, 
        CalculTime: '', 
        DietCutting: finalCalcList[0].dietCutt 
      }];

      return timeTableList
      
    } else {
      timeVal = timeConvert(timeCalc.countryTimes.domCountry1Start, timeCalc.countryTimes.domCountry1End);
      // eslint-disable-next-line
      var timeTableList = [{
        id: idCnt++, 
        Country: timeCalc.dCountry, 
        Start: timeCalc.countryTimes.domCountry1Start.format('YYYY-MM-DD HH:mm'), 
        End: timeCalc.countryTimes.domCountry1End.format('YYYY-MM-DD HH:mm'), 
        Time: timeVal, 
        Qty: '', 
        CalculTime: '', 
        DietCutting: ''
      }];
      timeVal = timeConvert(timeCalc.countryTimes.extCountry2Start, timeCalc.countryTimes.extCountry2End);
      timeTableList.push({
        id: idCnt++, 
        Country: timeCalc.country, 
        Start: timeCalc.countryTimes.extCountry2Start.format('YYYY-MM-DD HH:mm'), 
        End: timeCalc.countryTimes.extCountry2End.format('YYYY-MM-DD HH:mm'), 
        Time: timeVal, 
        Qty: timeCalc.countryDiet, 
        CalculTime: '', 
        DietCutting: finalCalcList[0].dietCutt
      });
      timeVal = timeConvert(timeCalc.countryTimes.domCountry3Start, timeCalc.countryTimes.domCountry3End);
      timeTableList.push({
        id: idCnt++, 
        Country: timeCalc.dCountry, 
        Start: timeCalc.countryTimes.domCountry3Start.format('YYYY-MM-DD HH:mm'), 
        End: timeCalc.countryTimes.domCountry3End.format('YYYY-MM-DD HH:mm'), 
        Time: timeVal, 
        Qty: timeCalc.dCountryDiet, 
        CalculTime: timeCalc.elapsedTimeDom, 
        DietCutting: finalCalcList[1].dietCutt
      });

      return timeTableList
    }
  }
  

  const styles = {
    container : {  width:'300px',  borderRadius : '5px',  padding:'30px 12px',  display:'flex',  flexDirection:'column',  gap:'15px',  boxShadow: "0 7px 10px rgb(0 0 0 / 0.2)"},
    flex : { width:'100%', display:'flex', gap:'5px', alignItems:'center' },
    flex2 : { width:'100%', display:'flex', gap:'5px', alignItems:'center', justifyContent: 'center' },
    bold : { fontSize:'13px', fontWeight: 600},
    thin : {  fontSize:'11px',  color:'#6f6f6f',  fontWeight: 500 },
    btn:{ borderRadius : '3px', border:'1px solid gray', display : 'flex', alignItems :'center', gap:'2px', padding : '3px', fontSize:'11px', color:'#4f4f4f', fontWeight: 600, cursor:'pointer', userSelect:'none'}
  }

  const generatePdfDocument = async (fileName = "DietPdfReport.pdf") => {
    setLoading(false);
    const blob = await pdf((
      <PdfReport finalCalcList = {finalCalcList} timeCalc = {timeCalc} timeCalcList = {timeCalcList} expNr = {sharedVariable} />
    )).toBlob();
    saveAs(blob, "DietPdfReport.pdf");
    setLoading(true);
  };

  return (
    <div style={styles.container}>
      
      <div style={styles.flex2}>
        {/* <CgFileDocument color='#90e0ef' size={20} /> */}
        <span style={styles.bold}>{title}</span>
      </div>
      <div style={styles.thin}>
        download file by clicking below icon
      </div>

      <div style={styles.flex2}>
        <IconButton color='secondary' aria-label="document" sx = {{ my: 1, displayPrint: 'none'}} onClick={generatePdfDocument}>
          <HiOutlineDocumentDownload size={70}/>
        </IconButton>
      </div>
      <div style={styles.bold} hidden={loading}>
        Wait ...
      </div>

    </div>
  )
}

// export default PdfCard