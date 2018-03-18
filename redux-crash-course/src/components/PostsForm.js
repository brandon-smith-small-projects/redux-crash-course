import React from 'react'
import Typography from 'material-ui/Typography';
import Card, {CardContent} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider'
import CloseIcon from 'material-ui-icons/Close';
import Dialog from 'material-ui/Dialog'
import AppBar from 'material-ui/AppBar';
import Snackbar from 'material-ui/Snackbar';
import Toolbar from 'material-ui/Toolbar';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class PostsForm extends React.Component{
  constructor(props){
    super(props)
    this.state={
      title: '',
      body: '',
      open: false,
      snackBarOpen: false,
    }
    
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.SnackBarClose = this.SnackBarClose.bind(this)
  }
  
  onChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }
  
  onSubmit(e){
    
    const post = {
      title: this.state.title,
      body: this.state.body
    }
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .then(() => {
      this.setState({open: false})
      setTimeout(() => {
        this.setState({snackBarOpen: true})
      }, 1000)
    })
  }
  
  handleClickOpen(){
    this.setState(
      { 
        open: true,
        title: '',
        body: ''
      }
    );
  }
  
  handleClose = () => {
    this.setState({ open: false });
  };
  
  SnackBarOpen(){
    this.setState({snackBarOpen: true})
  }
  
  SnackBarClose(){
    this.setState({snackBarOpen: false})
  }

  
  render(){

    return(
    <div>
      <Button 
        variant="raised" 
        style={
          { 
            backgroundColor: '#1565c0', 
            color: '#fff',
            marginTop: '30px'
          }
        }
        onClick={this.handleClickOpen}>Add Post
      </Button>
      <Dialog
        fullScreen
        open={this.state.open}
        onClose={this.handleClose}
        transition={Transition}
      >
        <AppBar style={{ backgroundColor: '#1565c0'}}>
          <Toolbar>
            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Add Post
            </Typography>
          </Toolbar>
        </AppBar>
        <Card>
          <CardContent>
            <Typography variant="subheading" component="h4" style={{ fontSize: "30px" }}>
              Add Posts
            </Typography>
            <div>
              <form >
                <TextField 
                  value={this.state.title}
                  name="title"
                  id="name" 
                  label="Name" 
                  margin="normal"
                  onChange={this.onChange}
                  fullWidth
                />
                <br />
                <TextField 
                  value={this.state.body}
                  id="body"
                  name="body"
                  label="Body" 
                  margin="normal" 
                  rows="4"
                  onChange={this.onChange}
                  multiline 
                  fullWidth
                />
                <br />
                <Button 
                  variant="raised" 
                  style={{ backgroundColor: '#1565c0', color: '#fff' }}
                  onClick={this.onSubmit}
                >
                  Submit
                </Button >
              </form>
            </div>
          </CardContent>
        </Card>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={4000}
        open={this.state.snackBarOpen}
        onClose={this.SnackBarClose}
        SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
        message={<span id="message-id">'{this.state.title}' Has Been Added</span>}
      />
    </div>
    )
  }
}
export default PostsForm