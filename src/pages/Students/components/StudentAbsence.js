import React, { Fragment, useEffect } from 'react';
import { Box, Text, Card, Stack, Icon } from '@chakra-ui/react';
import { CgTrashEmpty } from 'react-icons/cg';
import { isEmpty } from '../../../components/ModalTemplate';
import TableTemplate from '../../../components/Table';
import { useAuthPermission } from '../../../hook/useAuthPermission';
import { studentAbsenceTableHeader,studentExcuseTableHeader } from '../../../data/studentAbsence.header';
export const StudentAbsence = ({
  studentAbsence,
  isLoadingStudentAbsence,
  confirmPrompt,
  currentStudentAbsence,
  setDeletedItem,
  isExcuse
}) => {
  const { is_admin, instructor_id } = useAuthPermission();
  const filterDataBySection = (section_id) => {
    if (isEmpty(section_id)) {
      return currentStudentAbsence;
    }
    let filtered = currentStudentAbsence.filter(
      (item) => item.section_id == section_id
    );
    // console.log(filtered,"filtered")
    return filtered;
  };

  const sectionDetails = (section_id) => {
    if (currentStudentAbsence) {
      let filtered = currentStudentAbsence.filter(
        (item) => item.section_id == section_id
      )[0];

      return {
        // course_id:filtered.course_id,
        course_name: filtered.course_name,
        section_id: filtered.section_id,
        type: filtered.type,
      };
    }
    return {};
  };
  return (
    <Fragment>
      {!isLoadingStudentAbsence && !isEmpty(studentAbsence) ? (
        <Card p={10}>
          {/* <Text>{JSON.stringify(Array.from(new Set(studentAbsence.filter((e)=>e.instructor_id=='Ahmad2131')?.map((e)=>e.section_id))))}</Text> */}
          {Array.from(
            new Set(
              is_admin
                ? studentAbsence?.map((e) => e.section_id)
                : studentAbsence
                    .filter((e) => e.instructor_id == instructor_id)
                    ?.map((e) => e.section_id)
            )
          ).map((section_id) => {
            return (
              <Box my={10}>
                {/* <Text>{JSON.stringify(Object.keys(sectionDetails(section_id)).map((key)=>sectionDetails(section_id)[key]))}</Text> */}
                <Stack
                  borderBottom={'1px solid #EDF1F7'}
                  alignItems={'center'}
                  paddingLeft={4}
                  gap={5}
                  // color={orgDetailsLabelColor}
                  fontSize={[11, 12]}
                  fontFamily={'Inter'}
                  fontWeight={400}
                  pb={3}
                  overflowX={'auto'}
                  direction='row'
                  flexWrap={'wrap'}
                >
                  {Object.keys(sectionDetails(section_id)).map((key) => {
                    return (
                      <>
                        <Box>
                          {/* <Text fontSize={15} >{key.replace("_"," ")}</Text> */}
                          <Text fontSize={[12, 12, 15]} fontWeight={'bold'}>
                            {sectionDetails(section_id)[key]}
                          </Text>
                        </Box>
                      </>
                    );
                  })}
                </Stack>
                <TableTemplate
                  columns={!isExcuse? studentAbsenceTableHeader:studentExcuseTableHeader}
                  data={filterDataBySection(section_id)}
                  actions={[
                    {
                      aria_label: 'Delete absence',
                      icon: <Icon as={CgTrashEmpty} color={'red'} />,
                      onPress: (item) => {
                        console.log(item, 'item');
                        setDeletedItem({
                          student_id: item?.student_id,
                          section_id: item?.section_id,
                          absence_date: item?.absence_date,
                        });

                        confirmPrompt.onOpen();
                      },
                      isVisible:()=>!isExcuse
                    },
                  ]}
                />
              </Box>
            );
          })}
        </Card>
      ) : (
        !isLoadingStudentAbsence && (
          <Text textAlign={'center'} mt={5}>
            No Absence for this student
          </Text>
        )
      )}
    </Fragment>
  );
};
