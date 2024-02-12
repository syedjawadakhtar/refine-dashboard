import { useList } from "@refinedev/core";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React from 'react';

import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  TopAgent
} from 'components'

const Home = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart 
          title="Properties for Sale"
          value={684}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]} 
          />

        <PieChart 
          title="Properties for Rent"
          value={684}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]} 
          />

        <PieChart 
          title="Total Customers"
          value={684}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]} 
          />

        <PieChart 
          title="Properties for Cities"
          value={684}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]} 
          />
      </Box>
      <Stack mt="25px" width="100%" direction={{xs: 'column', lg: 'row' }} gap={20}>
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>
    </Box>
  )
}

export default Home