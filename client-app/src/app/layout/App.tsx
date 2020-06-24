import React, { useEffect, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';
import { LoadingComponent } from './LoadingComponent';

const App = () => {

  const activityStore = useContext(ActivityStore)

  useEffect(() => {
     activityStore.loadActivities();
  }, [activityStore])

  if(activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />

  return(

    <div>

    <NavBar />
        <Container style={{ marginTop: '7em' }}>
            <ActivityDashboard  />
        </Container>    
    </div>

      

  )
}

export default observer(App);
