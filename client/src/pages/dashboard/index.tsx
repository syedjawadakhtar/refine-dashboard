import { useList } from "@refinedev/core";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  TopAgent
} from 'components'
import React from "react";

const DashboardPage: React.FC = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>

      <Typography fontSize={15} fontWeight={550} color="#11142D">
        Property Name: Verona Heights, Shop Number 116
      </Typography>

      <Stack mt="25px" width="100%" direction={{xs: 'column', lg: 'row' }} gap={4}>
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>
      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart 
          title="Property for sales"
          value={0}
          series={[100, 0]}
          colors={["#275be8", "#c4e8ef"]} 
          />

        <PieChart 
          title="Properties for Rent"
          value={5}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]} 
          />

        <PieChart 
          title="Total Customers"
          value={9}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]} 
          />

        <PieChart 
          title="Properties for Cities"
          value={2}
          series={[65, 35]}
          colors={["#275be8", "#c4e8ef"]} 
          />
      </Box>
    </Box>
  )
}

export default DashboardPage