import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Container, Form, FormGroup, Input, Label, ListGroup, ListGroupItem} from "reactstrap";

function App() {
  const formMessageInit = {
    author: '',
    description: '',
    image: ''
  };

  const [formMessage, setFormMessage] = useState(formMessageInit);

  const [forumMessage, setForumMessage] = useState([]);

  const init = async () => {
    const data = await axios.get('http://localhost:8000/message');
    setForumMessage(data.data);
  };

  useEffect(() => {
    init();
  }, []);

  const formMessageChange = e => {
    setFormMessage({...formMessage, [e.target.name]: e.target.value})
  };

  const formFileChange = e => {
    setFormMessage({...formMessage, [e.target.name]: e.target.files[0]})
  };

  const addItem = async e => {
    e.preventDefault();
    const formData = new FormData();
    console.log(formMessage)
    Object.keys(formMessage).forEach(el => {
      formData.append(el, formMessage[el]);
    });
    await axios.post('http://localhost:8000/message', formData);
    init();
    setFormMessage({...formMessage, formMessageInit});
  };

  const forumElems = forumMessage.map(el => (
      <ListGroupItem key={el.id}>
        <h4>{el.author}</h4>
        <p>{el.description}</p>
        {el.image !== '' && <img alt={el.image} src={"http://localhost:8000/uploads/" + el.image} className='rounded mx-auto d-block' style={{width: '100%', maxWidth: '400px'}} />}
      </ListGroupItem>
  ))

  return (
      <Container>
        <Form onSubmit={addItem} >
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
                type="text"
                name="author"
                id="exampleEmail"
                placeholder="author"
                value={formMessage.author}
                onChange={formMessageChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Text Area</Label>
            <Input
                type="textarea"
                name="description"
                id="exampleText"
                placeholder="description"
                value={formMessage.text}
                onChange={formMessageChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile">File</Label>
            <Input
                type='file'
                name='image'
                onChange={formFileChange}
                id="exampleFile"
            />
          </FormGroup>
          <Button>ADD</Button>
        </Form>

        <ListGroup>{forumElems}</ListGroup>
      </Container>
  );
}

export default App;
