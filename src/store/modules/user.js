import { userLogin, logout, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userId: sessionStorage.userId || '',
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
    sessionStorage.userId = userId
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    console.log(state,name);
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  userLogin({ commit }, userInfo) {
    const { username, password } = userInfo
    // let params = new URLSearchParams()
    // params.append( 'name',username )
    // params.append( 'password',password )
    let params = {
      'name': username,
      'password': password
    }
    return new Promise((resolve, reject) => {
      userLogin(params).then(response => {
        const { data } = response
        console.log('登录返回数据',data)
        commit('SET_TOKEN', data.token)
        commit('SET_USERID', data.userId)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getUserInfo({ commit, state }, data) {
    console.log('data', data);
    return new Promise((resolve, reject) => {
      getUserInfo({userId: state.userId}).then(response => {
        const { data } = response
        console.log('用户信息',data)
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data
          console.log(name, avatar);
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

