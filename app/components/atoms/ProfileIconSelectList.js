import SelectList from 'react-native-dropdown-select-list' //to_do agregar a readme
import {View} from 'react-native';
import React from 'react';

const ProfileIconSelectList = () => {
    

    /*const [selected, setSelected] = React.useState("");
  
    const data = [
        {key:'1',value:'value1'},
        {key:2, value:'value2'}
    ];

    return(
        <SelectList 
            setSelected={setSelected} 
            data={data} 
            onSelect={() => alert(selected)} 
            Image style/>
  )*/

  const [selected, setSelected] = React.useState("");
  
  const data = [
    {key:'1',value:'value1'},
    {key:'2',value:'value2'},
    {key:'3',value:'value3'},
    {key:'4',value:'value4'},
  ];

  return(
    <SelectList 
      onSelect={() => alert(selected)}
      setSelected={setSelected} 
      data={data}  
      //arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />} 
      //searchicon={<FontAwesome name="search" size={12} color={'black'} />} 
      search={false} 
      boxStyles={{borderRadius:0}} //override default styles
      //defaultOption={{ key:'1', value:'Jammu & Kashmir' }}   //default selected option
    />
  )
};

export default ProfileIconSelectList