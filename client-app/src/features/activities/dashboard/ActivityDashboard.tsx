import React, { useContext, useEffect } from 'react'
import {observer} from 'mobx-react-lite'
import ActivityList from '../list/ActivityList'
import { Grid } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore'
import { LoadingComponent } from '../../../app/layout/LoadingComponent'



const ActivityDashboard = () => {

  
    const activityStore = useContext(ActivityStore)

    useEffect(() => {
       activityStore.loadActivities();
    }, [activityStore])
  
    if(activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />
    
    return (
        <Grid>
            <Grid.Column width={10}>
               <ActivityList />
           </Grid.Column>
           <Grid.Column width={6}>
                <h2>Activity Filter</h2>
           </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard)