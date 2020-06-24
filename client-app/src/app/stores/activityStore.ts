import {observable, action, configure, runInAction, computed} from 'mobx';
import { IActivity } from '../Models/activity';
import agent from '../api/agent';
import { createContext, SyntheticEvent } from 'react';

configure({enforceActions: 'always'})

class ActivityStore {
    @observable activityRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable selectedActivity : IActivity | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitesByDate() {
         return Array.from(this.activityRegistry.values()).sort((a,b) => Date.parse(a.date) - Date.parse(b.date))
    }

    @action loadActivities = async () => {

        this.loadingInitial = true;

        try {
        const activities = await agent.Activities.list();
            runInAction('load activities',() => {
                activities.forEach((activity) => {
                    activity.date = activity.date.split(".")[0];
                    this.activityRegistry.set(activity.id,activity)
                    this.loadingInitial = false;

                })
            })
        } catch (error) {
            runInAction('error loading activities', () => {
                this.loadingInitial = false;
            })
            console.log(error);
        }
       
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting=true
        try {
          await agent.Activities.create(activity);
    
          runInAction('creating activity',() => {
            this.activityRegistry.set(activity.id, activity)
            this.editMode = false;
            this.submitting = false;
          })
    
    
        } catch (error) {
    
          runInAction('error activity',() => {
            this.submitting = false;
          })
          console.log(error)
        }
      }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
    }

    @action editActivity = async(activity: IActivity) => {
        this.submitting=true;
        try {
          await agent.Activities.update(activity);
          runInAction('editing an activity', () => {
            this.activityRegistry.set(activity.id, activity);
            this.selectedActivity = activity;
            this.editMode = false;
            this.submitting = false;
          })
    
        } catch (error) {
          runInAction('edit activity error', () => {
              this.submitting=false;
          })
          console.log(error)
        }
      }
    
    
      @action openCreateForm = () => {
       this.editMode = true;
       this.selectedActivity = undefined;
     }
    
     @action openEditForm = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id)
        this.editMode = true;
     }

    @action cancelFormOpen = () => {
        this.editMode = false
    }

    @action cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
      }

      @action deleteActivity = async(event: SyntheticEvent<HTMLButtonElement>,id: string) => { 
        this.submitting = true;
        this.target = event.currentTarget.name 
   
        try {
          await agent.Activities.delete(id)
          runInAction('deleteing an activity', () => {
           this.activityRegistry.delete(id);
           this.submitting = false;
           this.target = ''
          })
        } catch (error) {
          runInAction('delete activity error', () => {
           this.target = ''
          })
          console.log(error)
        }
     }


}

export default createContext(new ActivityStore());

