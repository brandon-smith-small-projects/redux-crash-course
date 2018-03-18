import React from 'react'
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, {CardContent} from 'material-ui/Card';

class Posts extends React.Component{
  
  constructor(props){
    super(props)
    
    this.state = {
      posts: []
    }
  }
  
  componentWillMount(){
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => this.setState({posts: data}))
      
  }

  render(){
    const postItems = this.state.posts.map(post => {
      return(
        <Grid item sm={6}  key={post.id}>
          <div >
            <Card>
              <CardContent>
                  <Typography paragraph={true} variant="headline" component="h1" align="center">
                    {post.title}
                  </Typography>
                  <Typography paragraph={true} component="p">
                    {post.body}
                  </Typography>
              </CardContent>
            </Card>
          </div>
        </Grid>
      )
    })
    
    return (
      <div className="col m4 s12">
        <Typography 
          align='center' 
          variant="display1"
          component="h1"
          style={{margin: '30px 0', fontSize: '60px'}}
          
        >
          Posts
        </Typography>
        <Grid container spacing={24}>
          {postItems}
        </Grid>
      </div>
    )
  }
}

export default Posts