import SelectList from 'react-native-dropdown-select-list' //to_do agregar a readme
import {View, Alert} from 'react-native';
import React from 'react';
import {alertViajes} from '../Alert'

const ProfileIconSelectList = () => {
    
  const [selected, setSelected] = React.useState("");
  
  const viajes = [
    {key: {
      "origen": "Lugar 1",
      "destino": "Lugar 2",
      "datatime": new Date('2017-01-03')
    } ,value:'viaje 1'},
    {key: {
      "origen": "Lugar 4",
      "destino": "Lugar 3",
      "datatime": new Date('2017-02-03')
    } ,value:'viaje 2'},
    {key: {
      "origen": "Lugar 6",
      "destino": "Lugar 3",
      "datatime": new Date('2018-01-03')
    } ,value:'viaje 3'},
    {key: {
      "origen": "Lugar 2",
      "destino": "Lugar 5",
      "datatime": new Date('2019-01-03')
    } ,value:'viaje 4'},
    {key: {
      "origen": "Lugar 1",
      "destino": "Lugar 4",
      "datatime": new Date('2020-01-03')
    } ,value:'viaje 5'}
  ];

  return(
    <SelectList
      placeholder="Viajes" 
      onSelect={() => 
        alertViajes(selected.origen, selected.destino)
    }
      setSelected={setSelected} 
      data={viajes}  
      //arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />} 
      //searchicon={<FontAwesome name="search" size={12} color={'black'} />} 
      search={false} 
      boxStyles={{borderRadius:0}} //override default styles
      //defaultOption={{ key:'1', value:'Jammu & Kashmir' }}   //default selected option
    />
  )
};

export default ProfileIconSelectList