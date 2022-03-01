import {createContext, useContext, useEffect, useState} from 'react';

import {AsyncStorage} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export const TodoContext = createContext();

function TodoContextProvider(props) {
  const [data, setData] = useState([]);
  const key = 'records';

  useEffect(()=>{
    fetchAllSavedRecord();
  },[]);

  function fetchAllSavedRecord() {
    AsyncStorage.getItem(key,(error,result) => {
      if (error == null) {
        if (result != null) {
          let arrData = JSON.parse(result);
          setData(arrData);
        } else {
          setData([]);
        }
      }
    })
  }

  function saveText(text) {
    let arrData = [...data];
    arrData.push(text);
    AsyncStorage.removeItem(key, errorRemove => {
      if (errorRemove == null) {
        AsyncStorage.setItem(key, JSON.stringify(arrData), errorSetItem => {
          if (errorSetItem == null) {
            setData(arrData);
          }
        });
      }
    });
  }

  function deleteRecordAtIndex(index) {
    console.log('deleteRecordAtIndex: ',index)
    let arrData = [...data];
    arrData.splice(index, 1)
    AsyncStorage.removeItem(key, errorRemove => {
      if (errorRemove == null) {
        AsyncStorage.setItem(key, JSON.stringify(arrData), errorSetItem => {
          if (errorSetItem == null) {
            setData(arrData);
          }
        });
      }
    });
  }



  return (
    <TodoContext.Provider value={{data, saveText, deleteRecordAtIndex}}>
      {props.children}
    </TodoContext.Provider>
  );
}

export const useTodo = () => useContext(TodoContext);

export default TodoContextProvider;
