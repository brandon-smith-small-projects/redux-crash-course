import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/postActions'

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, {CardContent} from 'material-ui/Card';

class Posts extends React.Component{
  componentWillMount(){
    this.props.fetchPosts()
  }
  
  render(){
    const postItems = this.props.posts.map(post => {
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

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  posts: state.posts.items
})

export default connect(mapStateToProps, { fetchPosts })(Posts)