
import axios from 'axios';

export const bringCharacters = async () => {

    return await axios.get("https://rickandmortyapi.com/api/character/?page=25");
};

export const loginMeAgain = async (credentials) => {

    const res = await axios.post('http://localhost:3000/user/login', credentials)
    return res
}

export const bringMeDentist = async () => {

  const res = await axios.get('http://localhost:3000/user/dentist')
  return res
}

export const bringUserProfile = async (token) => {

    let config = {
        headers: { 
          'Authorization': 'Bearer '+ token.token,  
        }
    };

    return await axios.get(`http://localhost:3000/user/${token.user.id}`, config);
}

export const bringUsersAdmin = async (token, nameUs) => {

  let config = {
      headers: { 
        'Authorization': 'Bearer '+ token.token,  
      },
      params:{
        name: nameUs
      }
  };

  return await axios.get(`http://localhost:3000/user/`, config);
}

export const bringQuotesUser = async (token) => {

  let config = {
      headers: { 
        'Authorization': 'Bearer '+ token.token,  
      }
  };

  return await axios.get(`http://localhost:3000/quote/`, config);
}


export const register = async(data)=>{

  return await axios.post(`http://localhost:3000/user/`, data);

}

export const createNewQoute = async(quote, token)=>{

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token.token,  
    }
  };

  return await axios.post(`http://localhost:3000/quote/`, quote, config);

}
export const editQuote = async(idQuote,quote, token)=>{

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token.token,  
    }
  };

  return await axios.patch(`http://localhost:3000/quote/${idQuote}`, quote, config);

}
