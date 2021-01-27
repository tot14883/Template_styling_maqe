import "./App.css";
import axios from 'axios';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { ContactsOutlined } from "@material-ui/icons";
import { Row, Col, Image } from 'react-bootstrap';
import { FaRegClock, FaMapMarkerAlt } from "react-icons/fa";


class App extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      authors: [],
      posts:[],
    }

  }

  componentDidMount() {
     this.getAuthors()
     this.getPosts()
  }

   getAuthors = async () => {
    try {
     await axios.get('http://maqe.github.io/json/authors.json')
      .then((val)=>{
        this.setState({ authors: val.data, loading: true})
        //console.log(val.data);
      });
    } catch (error) {
      console.error(error);
    }
  }

  getPosts = async () => {
    try {
      await axios.get('http://maqe.github.io/json/posts.json')
       .then((val)=>{
        this.setState({ posts: val.data, loading: true })
         //console.log(val.data);
       });
     } catch (error) {
       console.error(error);
     }
  }

  cardArticle = () => {
    var row = [];
    for(let i = 0; i < this.state.posts.length; i++){
      var author = [];
      //console.log(this.state.authors[i].name)
      var splitTime = this.state.posts[i].created_at.split(' ');
      var splitDate = splitTime[0].split('-')
      this.state.authors.map((n, v)=>{
        if(n.id == this.state.posts[i].author_id){
          author = n;
        }
      })
      row.push(<div>
       <Card className="card_border mt-2">
      <div>
        <CardContent>
          <Row>
            <Col lg={2} md={2} sm={2} className="text-center">
              <Image src={this.state.posts[i].image_url} rounded width="140"/>
            </Col>
            <Col lg={7} md={7} sm={7}>
                <label className="h4">{this.state.posts[i].title}</label><br/>
                <label className="text-gray-16">{this.state.posts[i].body}</label><br/>
                <label className="text-14">
                  <FaRegClock size={20}/>&nbsp;&nbsp;
                  { splitDate[2]+" "+this.txtMonth(splitDate[1])+" "+splitDate[0]+" "+splitTime[1]}</label>
            </Col>
            
            <Col lg={3} md={3} sm={3} className="text-center border-left">
               <Image src={author.avatar_url} roundedCircle />

               <label className="text-red"><b>{author.name}</b></label><br/>
               <label><b>{author.role}</b></label><br/>
               <label><FaMapMarkerAlt size={16}/>&nbsp;&nbsp;New York</label>
            </Col>
          
          
          </Row>
         
        </CardContent>
      </div>
    
    </Card>
      </div>)
    }
    return row;
  }

  txtMonth = (val) =>{
    console.log(val)
    if(val == '01'){
       return 'JAN'
    }
    else if(val == '02'){
      return 'FEB'
    }
    else if(val == '03'){
      return 'MAR'
    }
    else if(val == '04'){
      return 'APR'
    }
    else if(val == '05'){
      return 'MAY'
    }
    else if(val == '06'){
      return 'JUN'
    }
    else if(val == '07'){
      return 'JUL'
    }
    else if(val == '08'){
      return 'AUG'
    }
    else if(val == '09'){
      return 'SEP'
    }
    else if(val == '10'){
      return 'OCT'
    }
    else if(val == '11'){
      return 'NOV'
    }
    else if(val == '12'){
      return 'DEC'
    }

  }

  render() {
    console.log(this.state.loading)
    var card = this.state.loading === false ? '' : this.cardArticle();
    return (
      <div className="container">
       <h1>MAQE Forums</h1>
       <h3>Subtitle</h3>
       <h5>Posts</h5>
       { card }
      </div>
    );
  }

  
}

export default App;
