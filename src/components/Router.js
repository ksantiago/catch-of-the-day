import { BrowserRouter, Route, Switch } from 'react-router-dom'
import StorePicker from './StorePicker';
import NotFound from './NotFound'

const Router = () => {
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={StorePicker} />
      <Route exact path="/notfound" component={NotFound} />
    </Switch>
  </BrowserRouter>
}

export default Router
