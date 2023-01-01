import { FieldProps } from 'formik';
import React from 'react';
import Select,{ StylesConfig } from 'react-select';
import { Box ,useColorModeValue} from '@chakra-ui/react';
// import chroma from 'chroma-js';
// import { OptionsType, ValueType } from "react-select/lib/types";


export const CustomSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti,
  setFieldTouched,
  setIsTutorial,
  setIsLab
}) => {
  const colorMode = useColorModeValue('light', 'dark');
  const backgroundColor = useColorModeValue("white","darkmode.widgetBg")
  const textColor = useColorModeValue("black","white")
  // colorMode=="light"?"white":"#1E1F23"
   
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
        setFieldTouched && setFieldTouched('course', true); // so if you don't have you don't call it 
      }}
      overflow={'visible'}
    >
      <Select
        className={className}
        name={field.name}
        value={getValue()}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        // isMulti={isMulti}
        maxMenuHeight={200}
        // colorScheme="black"
        // styles={colourStyles}
        // selectedOptionStyle="check"
      />
    </Box>
  );
};

export default CustomSelect;
