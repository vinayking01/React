import React from "react";
import { useState, useEffect } from "react";

export function useCustom_created(key, initialValue){
    const [id,SetValue] =useState(localStorage.getItem(key)?localStorage.getItem(key):initialValue);

    useEffect(()=>{
        localStorage.setItem(key,id);
      },[id,key])
      
    return [id,SetValue];
}