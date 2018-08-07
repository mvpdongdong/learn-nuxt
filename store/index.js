export const state = () => {
  return {
    counter: 0
  };
};

export const getters = {
  count (state) {
    return state.counter + 1;
  }
};

export const mutations = {
  increment (state) {
    state.counter++;
  }
};

export const actions = {
  nuxtServerInit ({dispatch, commit}, {req}) {
    return Promise.all([
      dispatch('user/logIn'),
      dispatch('increment')
    ]);
  },
  increment ({commit}) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('increment');
        resolve('increment success');
      }, 300);
    });
  }
};
