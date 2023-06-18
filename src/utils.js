// import { Cookies } from 'react-cookie';

export const EmailFormat = (email) => {
  if (/\S+@\S+\.\S+/.test(email)) return true;
  return false;
};


//redirect to the home page(./) after time
export const redirectHome = (time = 0) => {
  setTimeout(() => {
    // Redirect to home page
    window.location.pathname = '';
  }, time);
};

// redirect to the login page (./login) after time
export const redirectLogin = (time = 0) => {
  setTimeout(() => {
    // Redirect to login page
    window.location.pathname = 'login';
  }, time);
};


//relative date
export const relativeTime = (date) => {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (days === 0) {
    return "today"
  }
  else if (days === 1) {
    return "yesterday"
  }
  else if (weeks === 0) {
    return `${days} days ago`
  }
  else if (weeks === 1) {
    return "last week"
  }
  else {
    return "a long time ago"
  }
}

export const groupBy = (arr, key) => {
  const groups = arr.reduce((result, current) => {
    const groupKey = current[key];

    if (!result[groupKey]) {
      result[groupKey] = [];
    }

    result[groupKey].push(current);
    return result;
  }, {});

  return groups;
}

// export const isLoggedIn = () => {
//   console.log("Basma")
//   console.log(Cookies.get('jwt'))
// }