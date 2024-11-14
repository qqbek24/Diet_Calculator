import React , { Fragment } from 'react'
import { Image, Text, View, Page, Document, StyleSheet } from '@react-pdf/renderer';
import logo from '../Assets/arcelormittal-logo-light.png'
import chkbx_t from '../Assets/checkbox-checked.png'
import chkbx_f from '../Assets/checkbox-unchecked.png'


const PdfReport = (props) => {

  // console.log('pdf report component');

  const finalCalcList = props.finalCalcList;
  const timeCalc = props.timeCalc;
  const daysList = props.timeCalc.daysList;
  const timeCalcList = props.timeCalcList;

  const styles = StyleSheet.create({
    // update PDF styles
    page: {fontSize: 11, paddingTop: 20, paddingLeft: 40, paddingRight: 40, lineHeight: 1.5, flexDirection: 'column' },
    alignCenterLogo: {flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', color: "#3E3E3E" },
    titleContainer: {flexDirection: 'row', marginTop: 24, alignItems: 'center'},
    subTitleContainer: {flexDirection: 'row', alignItems: 'center', marginTop: 20 },
    logo: { width: 90 },
    checkBoxPNG: { width: 15, height: 15 },
    reportTitle: { fontSize: 16, textAlign: 'center' },
    addressTitle: {fontSize: 11, fontStyle: 'bold' }, 
    theader: { marginTop: 10, fontSize: 10, fontStyle: 'bold', paddingTop: 4, paddingLeft: 7, flex: 1, height: 20, backgroundColor: '#DEDEDE', borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth:1 },
    theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },
    tbody: { fontSize: 9, paddingTop: 4, paddingLeft: 7, flex: 1, borderColor: '#e8e8e8', borderRightWidth: 1, borderBottomWidth: 1 },
    // tbody_chkbx: { fontSize: 9, paddingTop: 2, paddingLeft: 7, flex: 1, borderColor: '#e8e8e8', borderRightWidth: 1, borderBottomWidth: 1 },
    total: { fontSize: 9, paddingTop: 10, paddingLeft: 7, flex: 0.715, borderColor: '#e8e8e8', borderBottomWidth: 1 },
    tbody2: { flex:2, borderRightWidth:1, }
  });

  const ReportTitleLogo = () => (
    // update ReportTitleLogo component here 
    <View style={styles.titleContainer}>
      <View style={styles.alignCenterLogo}>
        <Image style={styles.logo} src={logo} />
      </View>
    </View>
  );

  const ReportTitle = () => (
    // update ReportTitle component here
    <View style={styles.titleContainer}>
      <View style={styles.alignCenterLogo}>
        <Text style={styles.addressTitle}>Report for country: {timeCalc.country}.</Text>
      </View>
    </View>
  );

  const TimeCalculationTitle = () => (
    // update ReportTitle component here
    <View style={styles.subTitleContainer}>
      <View style={styles.alignCenterLogo}>
        <Text style={styles.addressTitle}>Real time calculation</Text>
      </View>
    </View>
  );

  const TableHeadTime = () => (
    // update TableHeadFood component here
    <View style={{ width:'100%', flexDirection :'row', marginTop:3}}>
      <View style={[styles.theader, styles.theader2]}>
        <Text>Country</Text>   
      </View>
      <View style={styles.theader}>
        <Text>Start</Text>   
      </View>
      <View style={styles.theader}>
        <Text>End</Text>   
      </View>
      <View style={styles.theader}>
        <Text>Time</Text>   
      </View>
      <View style={styles.theader}>
        <Text>Qty</Text>   
      </View>
      <View style={styles.theader}>
        <Text>Calcul. time</Text>   
      </View>
      <View style={styles.theader}>
        <Text>Diet Cutting</Text>   
      </View>
    </View>
  );

  const TableBodyTime = () => (
    // update TableBodyFood component here
    timeCalcList.map((row)=>(
      <Fragment key={row.id}>
        <View style={{ width:'100%', flexDirection :'row'}}>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text >{row.Country}</Text>   
          </View>
          <View style={styles.tbody}>
            <Text>{row.Start} </Text>   
          </View>
          <View style={styles.tbody}>
            <Text>{row.End}</Text>   
          </View>
          <View style={styles.tbody}>
            <Text>{(row.Time)}</Text>   
          </View>
          <View style={styles.tbody}>
            <Text>{row.Qty}</Text>   
          </View>
          <View style={styles.tbody}>
            <Text>{row.CalculTime}</Text>   
          </View>
          <View style={styles.tbody}>
            <Text>{row.DietCutting === '' ? row.DietCutting : Number(row.DietCutting).toFixed(2)}</Text>   
          </View>
        </View>
      </Fragment>
    ))
  );

  const TableFoodTitle = () => (
    // update ReportTitle component here
    <View style={styles.subTitleContainer}>
      <View style={styles.alignCenterLogo}>
        <Text style={styles.addressTitle}>Food calculation</Text>
      </View>
    </View>
  );

  const TableHeadFood = () => (
    // update TableHeadFood component here
    <View style={{ width:'100%', flexDirection :'row', marginTop:3}}>
      <View style={[styles.theader, styles.theader2]}>
        <Text>Country</Text>   
      </View>
      <View style={styles.theader}>
        <Text>Date</Text>   
      </View>
      <View style={styles.theader}>
        <Text>Hrs</Text>   
      </View>
      <View style={styles.theader}>
        <Text>Min</Text>   
      </View>
      <View style={styles.theader}>
        <Text>Breakfast</Text>   
      </View>
      <View style={styles.theader}>
        <Text>Dinner</Text>   
      </View>
      <View style={styles.theader}>
        <Text>Supper</Text>   
      </View>
      <View style={styles.theader}>
        <Text>Dishes</Text>   
      </View>
      <View style={styles.theader}>
        <Text>% Cutting</Text>   
      </View>
    </View>
  );

  const TableBodyFood = () => (
    // update TableBodyFood component here
    daysList.map((row)=>(
      <Fragment key={row.id}>
        <View style={{ width:'100%', flexDirection :'row'}}>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text>{row.country}</Text>   
          </View>
          <View style={styles.tbody}>
            <Text>{row.date} </Text>   
          </View>
          <View style={styles.tbody}>
            <Text>{row.h}</Text>   
          </View>
          <View style={styles.tbody}>
            <Text>{(row.m)}</Text>   
          </View>
          <View style={styles.tbody}>
            {row.brfst === true ? <Image style={styles.checkBoxPNG} src={chkbx_t} />  : <Image style={styles.checkBoxPNG} src={chkbx_f} />}
            {/* <Text>{row.brfst === true ? <TbCheckbox /> : ''}</Text>   */}
          </View>
          <View style={styles.tbody}>
            {row.din === true ? <Image style={styles.checkBoxPNG} src={chkbx_t} />  : <Image style={styles.checkBoxPNG} src={chkbx_f} />}
            {/* <Text>{row.din === true ? 'yes' : ''}</Text>    */}
          </View>
          <View style={styles.tbody}>
            {row.sup === true ? <Image style={styles.checkBoxPNG} src={chkbx_t} />  : <Image style={styles.checkBoxPNG} src={chkbx_f} />}
            {/* <Text>{row.sup === true ? 'yes' : ''}</Text>    */}
          </View>
          <View style={styles.tbody}>
            <Text>{row.dish === 0 ? '' : row.dish}</Text>   
          </View>
          <View style={styles.tbody}>
            <Text>{Number(row.prcnt) === 0 ? '' : '- ' + (row.prcnt * 100) + ' %'}</Text>   
          </View>
        </View>
      </Fragment>
    ))
  );

  const TableTotalTitle = () => (
    // update ReportTitle component here
    <View style={styles.subTitleContainer}>
      <View style={styles.alignCenterLogo}>
        <Text style={styles.addressTitle}>Diets calculation</Text>
      </View>
    </View>
  );

  const TableHeadTotal = () => (
    // update TableHeadTotal component here
    <View style={{ width:'100%', flexDirection :'row', marginTop:3}}>
      <View style={[styles.theader, styles.theader2]}>
        <Text >Date</Text>   
      </View>
      <View style={styles.theader}>
        <Text>Curr</Text>   
      </View>
      <View style={styles.theader}>
        <Text>Diets.</Text>   
      </View>
      <View style={styles.theader}>
        <Text>Rate PLN</Text>   
      </View>
      <View style={styles.theader}>
        <Text>Value PLN</Text>   
      </View>
      <View style={styles.theader}>
        <Text>Date Settl.</Text>   
      </View>
    </View>
  );

  const TableBodyTotal = () => (
    // update TableBodyTotal component here
    finalCalcList.map((row)=>(
      <Fragment key={row.id}>
        <View style={{ width:'100%', flexDirection :'row'}}>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text >{row.date}</Text>   
          </View>
          <View style={styles.tbody}>
            <Text>{row.curr} </Text>   
          </View>
          <View style={styles.tbody}>
            <Text>{row.diets}</Text>   
          </View>
          <View style={styles.tbody}>
            <Text>{(row.ratePLN)}</Text>   
          </View>
          <View style={styles.tbody}>
            <Text>{row.valuePLN}</Text>   
          </View>
          <View style={styles.tbody}>
            <Text>{row.dateSettl}</Text>   
          </View>
        </View>
      </Fragment>
    ))
  );

  const TableSumTotal = () => (
    // update TableSumTotal component here
    <View style={{ width:'100%', flexDirection :'row'}}>
      <View style={styles.total}>
        <Text></Text>   
      </View>
      <View style={styles.total}>
        <Text> </Text>   
      </View>
      <View style={styles.tbody}>
        <Text>Total</Text>   
      </View>
      <View style={styles.tbody}>
        <Text>
          {finalCalcList.reduce((valuePLN, item) => Number(valuePLN) + Number(item.valuePLN), 0).toFixed(2)}
        </Text>  
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <ReportTitleLogo/>
        <ReportTitle/>
        
        <TimeCalculationTitle/>
        <TableHeadTime/>
        <TableBodyTime/>

        <TableFoodTitle/>
        <TableHeadFood/>
        <TableBodyFood/>

        <TableTotalTitle/>
        <TableHeadTotal/>
        <TableBodyTotal/>

        <TableSumTotal/>
      </Page>
    </Document>
  )
}
export default PdfReport
