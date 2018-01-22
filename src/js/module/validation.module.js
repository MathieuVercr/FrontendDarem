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
  if(Date.parse(e.value)-Date.parse(new Date()) <= -86400000){
    return false;
  }else{
    return true;
  }
}

export function checkFriends(e){
  if(e.value.length > 0) return true;
  return false;
}

export function checkCategory(e){
  if(e.value) return true;
  return false;
}

export function enable(name, description, endDate, friends, category){
  if(checkName(name) && checkDescription(description) && checkDate(endDate) && checkFriends(friends) && checkCategory(category)){
    return false;
  }else {
    return true;
  }
}
