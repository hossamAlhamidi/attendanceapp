
import * as Yup from 'yup';
import moment from 'moment/moment';

export const isSameOrBefore = (startTime, endTime) => {
  console.log(endTime,"time")
  if(!endTime){
    return true
  }
  return moment(startTime, 'HH:mm').isSameOrBefore(moment(endTime, 'HH:mm'));
}
export const addSectionValidation = Yup.object().shape({
    section_id:Yup.string('Only Number allowed').max(7).required('Required'),
    from: Yup.string()  
      .when('same_time', {
        is: true,
        then: Yup.string().required('Time is required'),
      })
    .test(
      "from_test",
      "End time must be after from time",
      function(value) {
        const { to } = this.parent;
        return isSameOrBefore(value, to);
      }
    ),
    to: Yup.string()  
    .when('same_time', {
      is: true,
      then: Yup.string().required('Time is required'),
    }),
    // to: Yup.string()
    // course:Yup.string().required('Required'),
    // instructor_id:Yup.string().required('Required'),
    // course: Yup.array()
    // .min(1, 'sector of work should have at least one value')
    // .of(Yup.string().required('Required'))
    // .required('Required'),
    // instructor_id: Yup.array()
    // .min(1, 'sector of work should have at least one value')
    // .of(Yup.string().required('Required'))
    // .required('Required'),
    classroom:Yup.string().max(7).required('Required'),
    days: Yup.array().min(1).of(Yup.string().required()).required(),
    sunday_from: Yup.string().when(['same_time', 'days'], {
        is: (same_time, days) => !same_time && days.includes('sunday'),
        then: Yup.string().required("Time is required"),
      }).test(
        "sunday_from_test",
        "End time must be after from time",
        function(value) {
          const { sunday_to } = this.parent;
          return isSameOrBefore(value, sunday_to);
        }
      ),
      sunday_to: Yup.string().when(['same_time', 'days'], {
        is: (same_time, days) => !same_time && days.includes('sunday'),
        then: Yup.string().required("Time to is required"),
      }),
      monday_from: Yup.string().when(['same_time', 'days'], {
        is: (same_time, days) => !same_time && days.includes('monday'),
        then: Yup.string().required("Time is required"),
      }).test(
        "monday_from_test",
        "End time must be after from time",
        function(value) {
          const { monday_to } = this.parent;
          return isSameOrBefore(value, monday_to);
        }
      ),
      monday_to: Yup.string().when(['same_time', 'days'], {
        is: (same_time, days) => !same_time && days.includes('monday'),
        then: Yup.string().required("Time to is required"),
      }),
      tuesday_from: Yup.string().when(['same_time', 'days'], {
        is: (same_time, days) => !same_time && days.includes('tuesday'),
        then: Yup.string().required("Time is required"),
      }).test(
        "tuesday_from_test",
        "End time must be after from time",
        function(value) {
          const { tuesday_to } = this.parent;
          return isSameOrBefore(value, tuesday_to);
        }
      ),
      tuesday_to: Yup.string().when(['same_time', 'days'], {
        is: (same_time, days) => !same_time && days.includes('tuesday'),
        then: Yup.string().required("Time to is required"),
      }),
      wednesday_from: Yup.string().when(['same_time', 'days'], {
        is: (same_time, days) => !same_time && days.includes('wednesday'),
        then: Yup.string().required("Time is required"),
      }).test(
        "wednesday_from_test",
        "End time must be after from time",
        function(value) {
          const { wednesday_to } = this.parent;
          return isSameOrBefore(value, wednesday_to);
        }
      ),
      wednesday_to: Yup.string().when(['same_time', 'days'], {
        is: (same_time, days) => !same_time && days.includes('wednesday'),
        then: Yup.string().required("Time to is required"),
      }),
      thursday_from: Yup.string().when(['same_time', 'days'], {
        is: (same_time, days) => !same_time && days.includes('thursday'),
        then: Yup.string().required("Time is required"),
      }).test(
        "thursday_from_test",
        "End time must be after from time",
        function(value) {
          const { thursday_to } = this.parent;
          return isSameOrBefore(value, thursday_to);
        }
      ),
      thursday_to: Yup.string().when(['same_time', 'days'], {
        is: (same_time, days) => !same_time && days.includes('thursday'),
        then: Yup.string().required("Time to is required"),
      }),
   

});

export const editSectionValidation = Yup.object().shape({
    section_id:Yup.string('Only Number allowed').max(7).required('Required'),
    from: Yup.string()  
      .when(['same_time','days','type'], {
        is: (same_time,days, type) => same_time && type=='lecture',
        then: Yup.string().required('Time is required'),
      })
    .test(
      "from_test",
      "End time must be after from time",
      function(value) {
        const { to } = this.parent;
        return isSameOrBefore(value, to);
      }
    ),
    to: Yup.string()  
    .when(['same_time','lecture'], {
        is: (same_time, days) => same_time && days.includes('sunday'),
      then: Yup.string().required('Time is required'),
    }),
    // to: Yup.string()
    // course:Yup.string().required('Required'),
    // instructor_id:Yup.string().required('Required'),
    // course: Yup.array()
    // .min(1, 'sector of work should have at least one value')
    // .of(Yup.string().required('Required'))
    // .required('Required'),
    // instructor_id: Yup.array()
    // .min(1, 'sector of work should have at least one value')
    // .of(Yup.string().required('Required'))
    // .required('Required'),
    classroom:Yup.string().max(7).required('Required'),
    days: Yup.array().min(1).of(Yup.string().required()).required(),
    sunday_from: Yup.string().when(['same_time', 'days'], {
        is: (same_time, days) => !same_time && days.includes('sunday'),
        then: Yup.string().required("Time is required"),
      }).test(
        "sunday_from_test",
        "End time must be after from time",
        function(value) {
          const { sunday_to } = this.parent;
          return isSameOrBefore(value, sunday_to);
        }
      ),
      sunday_to: Yup.string().when(['same_time', 'days'], {
        is: (same_time, days) => !same_time && days.includes('sunday'),
        then: Yup.string().required("Time to is required"),
      }),
      monday_from: Yup.string().when(['same_time', 'days'], {
        is: (same_time, days) => !same_time && days.includes('monday'),
        then: Yup.string().required("Time is required"),
      }).test(
        "monday_from_test",
        "End time must be after from time",
        function(value) {
          const { monday_to } = this.parent;
          return isSameOrBefore(value, monday_to);
        }
      ),
      monday_to: Yup.string().when(['same_time', 'days'], {
        is: (same_time, days) => !same_time && days.includes('monday'),
        then: Yup.string().required("Time to is required"),
      }),
      tuesday_from: Yup.string().when(['same_time', 'days'], {
        is: (same_time, days) => !same_time && days.includes('tuesday'),
        then: Yup.string().required("Time is required"),
      }).test(
        "tuesday_from_test",
        "End time must be after from time",
        function(value) {
          const { tuesday_to } = this.parent;
          return isSameOrBefore(value, tuesday_to);
        }
      ),
      tuesday_to: Yup.string().when(['same_time', 'days'], {
        is: (same_time, days) => !same_time && days.includes('tuesday'),
        then: Yup.string().required("Time to is required"),
      }),
      wednesday_from: Yup.string().when(['same_time', 'days'], {
        is: (same_time, days) => !same_time && days.includes('wednesday'),
        then: Yup.string().required("Time is required"),
      }).test(
        "wednesday_from_test",
        "End time must be after from time",
        function(value) {
          const { wednesday_to } = this.parent;
          return isSameOrBefore(value, wednesday_to);
        }
      ),
      wednesday_to: Yup.string().when(['same_time', 'days'], {
        is: (same_time, days) => !same_time && days.includes('wednesday'),
        then: Yup.string().required("Time to is required"),
      }),
      thursday_from: Yup.string().when(['same_time', 'days'], {
        is: (same_time, days) => !same_time && days.includes('thursday'),
        then: Yup.string().required("Time is required"),
      }).test(
        "thursday_from_test",
        "End time must be after from time",
        function(value) {
          const { thursday_to } = this.parent;
          return isSameOrBefore(value, thursday_to);
        }
      ),
      thursday_to: Yup.string().when(['same_time', 'days'], {
        is: (same_time, days) => !same_time && days.includes('thursday'),
        then: Yup.string().required("Time to is required"),
      }),
   

});