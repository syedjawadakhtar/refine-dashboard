import { Add } from '@mui/icons-material';
import { useTable } from '@refinedev/core'; // For pagination, sorting and filtering
import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';

import { PropertyCard, CustomButton } from 'components';

const AllProperties = () => {
  const navigate = useNavigate();

  const {
    tableQueryResult: { data, isLoading, isError }
  } = useTable();

  console.log(data);

  return (
    <Box>
      <Stack direction="row"
      justifyContent="space-between"
      alignContent="center">
        <Typography fontSize={25}
        fontWeight={700}
        color="#11142d">All Properties</Typography>
        <CustomButton
          title="Add Property"
          handleClick={() => navigate('/properties/create')}
          backgroundColor="#475be8"
          color="#fcfcfc"
          icon={<Add />}></CustomButton>
      </Stack>

      <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>

      </Box>
    </Box>
  )
}

export default AllProperties