export const state = () => {
  return {
    userName: '',
    userEmail: '',
    isLogin: false
  };
};

export const getters = {
  userInfo (state) {
    return state.userName;
  }
};

export const mutations = {
  logOut (state) {
    state.isLogin = false;
  },
  logIn (state, data) {
    state.isLogin = true;
    state.userName = data.userName;
    state.userEmail = data.userEmail;
  }
};

export const actions = {
  logIn ({commit}) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('logIn', {
          userName: 'shendong',
          userEmail: 'dongshen211299@sohu-inc.com'
        });
        resolve();
      }, 300);
    });
  },
  logOut ({commit}) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('logOut');
        resolve();
      }, 300);
    });
  }
};
