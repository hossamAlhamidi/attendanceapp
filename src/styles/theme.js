import { extendTheme } from "@chakra-ui/react";
import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { useColorModeValue } from "@chakra-ui/react";
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

  // const baseStyle = definePartsStyle({
  //   // define the part you're going to style
  //   container: {
  //     backgroundColor: '#e7e7e7',
  //   },
  //   header: {
  //     paddingBottom: '2px',
  //   },
  //   body: {
  //     paddingTop: '2px',
  //   },
  //   footer: {
  //     paddingTop: '2px',
  //   },
  // })
  
  // const sizes = {
  //   md: definePartsStyle({
  //     container: {
  //       borderRadius: '0px',
  //     },
  //   }),
  // }
  
  //  const cardTheme = defineMultiStyleConfig({ baseStyle, sizes })
//   const baseStyle = definePartsStyle({
//     // define the part you're going to style
//     field: {
//       border: '1px solid black',
//       borderColor: 'red',
//       background: 'red',
//       borderRadius: 'full',
//       color:"red",
  
//       // Let's also provide dark mode alternatives
//       _dark: {
//         borderColor: 'green',
//         background: 'green',
//       },
//     },
//     defaultProps: {
//       variant: 'field',
//     },
//   })
//  const inputTheme = defineMultiStyleConfig({ baseStyle })
const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
  };

  const colorModes = {
    light: 'light',
    dark: 'dark',
  };
   
  export const customTheme = extendTheme({
    styles: {
        global: (props) => ({
          // styles for the `body`
          body: {
            bg:
              props.colorMode === colorModes.dark
                ? 'darkMode.bodyBg'
                : 'lightMode.bodyBg',
          },
          a:{
            _hover: {
                textDecoration: 'none',
              },
          }
          
        }),
      },
        fonts: {
            // heading: 'IBM Plex Sans,Inter, sans-serif',
            // body: 'IBM Plex Sans,Inter, sans-serif',
          },
          config,
          components: {
            // Card:cardTheme,
            Card:{ baseStyle: (props) => ({
              container: {
                backgroundColor: props.colorMode === colorModes.light ? 'white' : 'darkMode.widgetBg',
              },
            })},
            Input: {
              baseStyle: (props) => ({
                field: {
                  bg:  props.colorMode === colorModes.light ? 'white' : 'black',
                  borderColor: props.colorMode === colorModes.light ? 'lightgrey' : 'darkgrey',
                  borderWidth: 1,
                  // color:props.colorMode === colorModes.light ? 'black' : 'white'
                  _focus: {
                    boxShadow: "0 0 2px 2px #1AA8E9",
                    borderWidth: 0,
                  }
                },
              }),
              sizes: {},
              variants: {},
              defaultProps: {
                variant: null,
              },
            },
         
            Button: {
              variants: {
                primary: (props) => ({
                  bgColor:
                    props.colorMode === colorModes.dark
                      ? 'darkMode.primary.default'
                      : 'lightMode.primary.default',
                  size: 'sm',
                  fontSize: 'sm',
                  color: 'lightMode.whiteText',
                  fontWeight: 'semibold',
                  // paddingX: '50',
                  _hover: {
                    bgColor:
                      props.colorMode === colorModes.dark
                        ? 'darkMode.primary.hover'
                        : 'lightMode.primary.hover',
                  },
                  _focus: {
                    bgColor:
                      props.colorMode === colorModes.dark
                        ? 'darkMode.primary._dark'
                        : 'lightMode.primary._dark',
                  },
                  _active: {
                    bgColor:
                      props.colorMode === colorModes.dark
                        ? 'darkMode.primary._dark'
                        : 'lightMode.primary._dark',
                  },
                }),
                pagination: (props) => ({
                  // borderColor:
                  //   props.colorMode === colorModes.dark
                  //     ? 'darkMode.gray'
                  //     : 'lightMode.primary.default',
                  border: '1px solid',
                  bgColor:
                    props.colorMode === colorModes.dark
                      ? 'darkMode.widgetBg'
                      : 'lightMode.whiteText',
                  size: 'sm',
                  fontSize: 'sm',
                  color: 'lightMode.whiteText',
                  fontWeight: 'semibold',
                  // paddingX: '50',
                  _hover: {
                    bgColor:
                      props.colorMode === colorModes.dark
                        ? 'darkMode.primary.hover'
                        : 'lightMode.primary.default',
                     color:"white"    
                  },
                  _focus: {
                    bgColor:
                      props.colorMode === colorModes.dark
                        ? 'darkMode.widgetBg'
                        : 'lightMode.whiteText',
                  },
                  _active: {
                    bgColor:
                      props.colorMode === colorModes.dark
                        ? 'darkMode.primary._dark'
                        : 'lightMode.primary._dark',
                  },
                }),
                icon: (props) => ({
                  borderWidth: 1,
                  borderRadius: 3,
                  bgColor:
                    props.colorMode === colorModes.dark
                      ? 'darkMode.background'
                      : 'lightMode.white',
                  paddingX: 0,
                }),
                secondary: (props) => ({
                  bgColor:
                    props.colorMode === colorModes.dark
                      ? 'darkMode.background'
                      : 'lightMode.gray',
                  color:
                    props.colorMode === colorModes.dark
                      ? 'darkMode.white'
                      : 'primary.800',
                  size: 'sm',
                  fontSize: 'sm',
                  fontWeight: 'normal',
                  // paddingX: '50',
                  // _hover: {
                  //   bgColor: 'lightMode.primary.hover',
                  // },
                  // _focus: {
                  //   bgColor: 'lightMode.primary._dark',
                  // },
                  // _active: {
                  //   bgColor: 'lightMode.primary._dark',
                  // },
                }),
                // primary: {
                //   bgColor: "lightMode.btnBgColor",
                //   size: "md",
                //   color: "lightMode.white",
                //   fontWeight: "700",
                //   _hover: {
                //     bgColor: "lightMode.btnBgColor",
                //   },
                //   _focus: {
                //     bgColor: "lightMode.btnBgColor",
                //   },
                //   _active: {
                //     bgColor: "lightMode.btnBgColor",
                //   },
                // },
                blue: {
                  bgColor: 'lightMode.blue',
                  size: 'md',
                  color: 'lightMode.white',
                  fontWeight: '700',
                  _hover: {
                    bgColor: 'lightMode.blue',
                  },
                  _focus: {
                    bgColor: 'lightMode.blue',
                  },
                  _active: {
                    bgColor: 'lightMode.blue',
                  },
                },
                gray: {
                  bgColor: 'lightMode.gray',
                  size: 'sm',
                  // color: 'lightMode.white',
                  fontWeight: 'normal',
                  _hover: {
                    bgColor: 'lightMode.blue',
                  },
                  _focus: {
                    bgColor: 'lightMode.blue',
                  },
                  _active: {
                    bgColor: 'lightMode.blue',
                  },
                },
                danger: {
                  bgColor: 'red.500',
                  color: '#f3f3f3',
                  paddingX: '50',
                  size: 'sm',
                  fontSize: 'sm',
                  fontWeight: 'normal',
                },
              },
              defaultProps: {
                variant: 'primary',
              },
            },
            CheckboxGroup: {
              variants: {
                lime: {
                  bgColor: 'lightMode.primary.default',
                  size: 'lg',
                  // color: 'lightMode.whiteText',
                  // fontWeight: 'semibold',
                },
              },
            },
        
            Modal: {
              parts: ['content'],
              baseStyle: (props) => ({
                dialog: {
                  bgColor:
                    props.colorMode === colorModes.dark
                      ? 'darkMode.widgetBg'
                      : 'lightMode.background',
                },
              }),
            },
            Text: {
              variants: {
                titleText: (props) => ({
                  color:
                    props.colorMode === colorModes.dark
                      ? 'darkMode.white'
                      : 'lightMode.darkGray',
                }),
              },
            },
          },
          Text: {
            variants: {
              titleText: (props) => ({
                color:
                  props.colorMode === colorModes.dark
                    ? 'darkMode.white'
                    : 'lightMode.darkGray',
              }),
            },
          },
          colors: {
            brand: {
              900: '#1a365d',
              800: '#153e75',
              700: '#2a69ac',
            },
            primary: {
              50: '#e3e4ef',
              100: '#babcd7',
              200: '#8e91bc',
              300: '#6368a2',
              400: '#454a91',
              500: '#252d7f',
              600: '#202677',
              700: '#171e6c',
              800: '#0e1561',
              900: '#00034c',
            },
            danger: {
              10: '#f4433610',
              50: '#ffebee',
              100: '#ffcdd2',
              200: '#ef9a9a',
              300: '#e57373',
              400: '#ef5350',
              500: '#f44336',
              600: '#e53935',
              700: '#d32f2f',
              800: '#c62828',
              900: '#b71b1c',
            },
            success: {
              10: '#3dd59810',
              50: '#e2f8ed',
              100: '#b7edd2',
              200: '#84e1b6',
              300: '#3dd598',
              400: '#00cb81',
              500: '#00c06c',
              600: '#00b061',
              700: '#009d53',
            },
        
            warning: {
              10: '#ffb41f10',
              500: '#ffc224',
              600: '#ffb41f', // main
              700: '#fea21d',
              800: '#fe911b', // soft orange
              900: '#fc7318', // hard orange
            },
        
            primaryBlue: {
              10: '#1AA8E910',
              900: '#1AA8E9',
            },
        
            darkMode: {
              mainBgColor: '#243641',
              navBgColor: '#1C2A35',
              secBgColor: '#243641',
        
              miniBgColor: ' #1C2A35',
              inputBgColor: '#1c2b36',
        
              btnTextColor: 'black',
              // darkTextColor: "#ffff",
              // mainTextColor: "#1b7ebd",
        
              darkTextColor: '#000000',
              mainTextColor: '#84C9FB',
              dashboardHeader: '#D9D9D9',
              labelTextColor: '#D2D2D240',
              cardBgColor: '#1C2A35',
              labelBgColor: '#1991DD',
              widgetBackground: '#F7F7F7',
        
              // New Theme Color Variables
              primary: {
                default: '#1AA8E9',
                hover: '#0f87c7',
                _dark: '#065691',
              },
              secondary: {
                gray: '#969696',
                lightBlue: '#1AA8E9',
              },
              background: '#33343D',
              white: '#FFFFFF',
              widgetBg: '#1E1F23',
              gray: '#EDF1F7',
              headerText: '#FFFFFF',
              lime: '#3DD598',
              bodyBg: '#101010',
              lightText: '#33343D',
            },
            lightMode: {
              mainBgColor: '#cbd5e1',
              navBgColor: '#00609C',
              secBgColor: '#D9E3EB',
        
              // miniBgColor: " #1C2A35",
              inputBgColor: 'white',
        
              dashboardHeader: '#D9D9D9',
              widgetBackground: '#F7F7F7',
              miniBgColor: '#FFFFFF',
        
              darkTextColor: '#000000',
              mainTextColor: '#000000',
              btnTextColor: 'black',
              labelTextColor: '#00000040',
              cardBgColor: '#FFFFFF',
              btnBgColor: '#59A9E9',
              labelBgColor: '#7BB4E3',
        
              // New Theme Color Variables
              primary: {
                default: '#145DA0',
                hover: '#15187a',
                gray: '#969696',
                _dark: '#0f1163',
              },
              secondary: {
                gray: '#A7A9C0',
                lightBlue: '#1AA8E9',
              },
              whiteText: '#FFFFFF',
              lime: '#3DD598',
              darkText: '#33343D',
              headerText: '#01058A',
              gray: '#EDF1F7',
              background: '#FFFFFF',
              textType1: '#33343D',
              bodyBg: '#F7F6F6',
            },
          },
      
  })



