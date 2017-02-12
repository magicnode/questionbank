let conf = {
    msg: {
        MSG_SUCCESS: {
            code: 0,
            msg: '请求成功'
        },
        MSG_ERROR: {
            code: -1,
            msg: '请求失败'
        },
        MSG_100001: {
            code: 100001,
            msg: '该用户名已存在'
        }
    }
}

function msgExpend () {
  return {
      getMsg: function(sign) {
          return conf['msg']['MSG_'+sign] ? conf['msg']['MSG_'+sign] : null
      }
  }
}

function send () {
  return msgExpend.getMsg(sign)
}

function success (data) {
  return Object.assgin(msgExpend.getMsg('SUCCESS'), data)
}

export default {
  send,
  success
}