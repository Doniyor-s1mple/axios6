import React from 'react'
import { doGet } from './servis'
import { useState } from 'react'
import { useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { AvForm, AvField } from 'availity-reactstrap-validation'

const Posts = ({ history }) => {

  const [Posts, setPosts] = useState([])
  const [data, setData] = useState([])
  const [Users, setUsers] = useState([])
  const [active, setActive] = useState(false)

  async function getPosts() {
    const res = await doGet('/posts')
    setPosts(res.data)
    setData(res.data)
  }

  async function getUsers() {
    const res = await doGet('/users')
    setUsers(res.data)
  }


  useEffect(() => {
    getPosts()
    getUsers()
  }, [])

  var OpenOnePost = (id) => {
    history.push('/posts/' + id)
  }

  const filter = (userId) => {
    return data.filter(item => item.userId === parseInt(userId) || userId === '')
  }

  function userSelect(event) {
    var userId = event.target.value
    var res = filter(userId)
    setPosts(res)
  }

  var OpenModal = () => {
    setActive(prev => !prev)
  }

  var SubmitForm = (event, values) => {
    Posts.unshift(values)
    setPosts(Posts)
    setActive(false)
  }

  return (

    <>
      <h2 className='text-center text-light my-5'>Posts</h2>
      <div className="row my-4 ">
        <div className="col-3">
          <select id="" className='form-control' onChange={userSelect}>
            <option value={""}>All</option>
            {
              Users.map((item, index) => <option key={index} id={item.id} value={item.id}>
                {item.name}
              </option>)}
          </select>
        </div>
        <div className="col-9">
          <button className='btn btn-outline-warning float-end' onClick={() => OpenModal()}>Modal</button>
        </div>
      </div>
      <div className="row">
        {
          Posts.map((item, index) => <div key={index} className='col-3' >
            <div className="card my-2" onClick={() => OpenOnePost(item.id)}>
              <div className="card-header">
                {index+1}.  {item.title}
              </div>
              <div className="card-body">
                {item.body}
              </div>
            </div>
          </div>)
        }
      </div>

      <Modal isOpen={active} toggle={OpenModal}>
        <ModalHeader>Add Post</ModalHeader>
        <ModalBody>
          <AvForm id='bb' onValidSubmit={SubmitForm}>
            <AvField name='title' label='title' required />
            <AvField name='body' label='body' required />
          </AvForm>
        </ModalBody>
        <ModalFooter>
          <Button color='success' form='bb'>save</Button>
          <Button color='danger' onClick={OpenModal}>cancel</Button>
        </ModalFooter>
      </Modal>

    </>





  )
}

export default Posts