export function checkName(e){
  let result = /^[a-zA-Z0-9_ ]*$/.test(e.value);
  if(e.value.length < 5) return false;
  return result;
}

export function checkDescription(e){
  let result = /^[a-zA-Z0-9_ .?-]*$/.test(e.value);
  if(e.value.length < 10) return false;
  return result;
}

export function checkDate(e){
  if(e.value === "") return false;
  if(Date.parse(e.value)-Date.parse(new Date()) <= 0){
    return false;
  }else{
    return true;
  }
}

export function enable(name, description, endDate){
  if(checkName(name) && checkDescription(description) && checkDate(endDate)){
    return false;
  }else {
    return true;
  }
}
