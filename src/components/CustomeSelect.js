import { FieldProps } from 'formik';
import React from 'react';
import Select,{ StylesConfig } from 'react-select';
import { Box ,useColorModeValue} from '@chakra-ui/react';
// import chroma from 'chroma-js';
// import { OptionsType, ValueType } from "react-select/lib/types";
import { isEmpty } from './ModalTemplate';

export const CustomSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti,
  setFieldTouched,
  setIsTutorial,
  setIsLab,
  onBlur,
  setInstructorIdError,
  setCourseError
}) => {
  const colorMode = useColorModeValue('light', 'dark');
  const backgroundColor = useColorModeValue("white","darkmode.widgetBg")
  const textColor = useColorModeValue("black","white")
  // colorMode=="light"?"white":"#1E1F23"
  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: backgroundColor,borderColor:colorMode=='light'?"#e2e6f0":"#e2e6f040"}),
    option: (styles) => {
      return {
        ...styles,
        backgroundColor: colorMode=="light"?"white":"#1E1F23",
        color: textColor,
        // cursor: isDisabled ? 'not-allowed' : 'default',
        ':hover': {
          backgroundColor:'grey',
          color: 'white',
        },
        // ':active': {
        //   ...styles[':active'],
        //   backgroundColor: 
        //        "pink"
            
        // },
      };
    },
    multiValue: (styles) => {  // circle it self
      // const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: colorMode=='light'?"lightgray":"darkgrey",
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: colorMode=="light"?"black":"white",  // label inside circle
    }),
    // multiValueRemove: (styles) => ({
    //   ...styles,
    //   color: "green",
    //   ':hover': {
    //     backgroundColor: "blue",
    //     color: 'black',
    //   },
    // }),
  };
  const onChange = (option) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option ).map((item) => item.value)
        : (option ).value
    );
    if(field.name == 'instructor_id'){
        form.setFieldValue(
             'instructor_name',
            (option ).label
          );
    }
    else if(field.name=="tutorial_instructor_id"){
        form.setFieldValue(
            'tutorial_instructor_name',
           (option ).label
         );
    }
    else if(field.name=="lab_instructor_id"){
        form.setFieldValue(
            'lab_instructor_name',
           (option ).label
         );

         
    }
    if(field.name == 'course'){
      form.setFieldValue(
           'course_name',
          (option ).label
        );
  }
    
    setIsTutorial&& setIsTutorial(option.has_tutorial)
    setIsLab&&setIsLab(option.has_lab);
    setInstructorIdError&&setInstructorIdError("")
    setCourseError&&setCourseError("")
    
  };
  
  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    } else {
      return isMulti ? [] : ('' );
    }
  };

  return (
    <Box
      onClick={() => {
        setFieldTouched && setFieldTouched(field.name, true,true); // so if you don't have you don't call it 
      }}
      overflow={'visible'}
    >
      <Select
        className={className}
        // onFocus={()=>{
        //   setFieldTouched('instructor_id', true,true);
        //   onBlur();
        // }}
        name={field.name}
        value={getValue()}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        // isMulti={isMulti}
        maxMenuHeight={200}
        // colorScheme="black"
        styles={colourStyles}
        // selectedOptionStyle="check"
        onBlur={()=>{
          // formik.setFieldError('instructor_id',"")
          // formik.setFieldTouched('instructor_id', true);
          onBlur();
        }}
      />
    </Box>
  );
};

export default CustomSelect;
