import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { useTicTacToe } from "./useTicTacToe";

interface TicTacToeProps {
  singleplayer: boolean;
}

export const TicTacToe: React.FC<TicTacToeProps> = ({ singleplayer }) => {
  const hook = useTicTacToe(singleplayer);

  return (
    <Flex
      direction="column"
      width="100vw"
      height="100vh"
      backgroundColor="#222222"
      align="center"
      justify="center"
    >
      <Text color="#F3EFE0" fontSize="40px">
        {hook.turn === 1 ? "X Turn" : "O Turn"}
      </Text>
      {/* The following Grid represents the tic tac toe table */}
      <Grid height="300px" width="300px" templateColumns="repeat(3, 100px)">
        {hook.matrix.map((row, i) => {
          return row.map((cell, j) => {
            return (
              <GridItem
                key={i + j}
                height="100px"
                width="100px"
                border="2px solid #F3EFE0"
                fontSize="80px"
                cursor="pointer"
                color="#F3EFE0"
                display="flex"
                alignItems="center"
                justifyContent="center"
                onClick={() => {
                  hook.handleCellClick(i, j);
                }}
              >
                {hook.showText(cell)}
              </GridItem>
            );
          });
        })}
      </Grid>
    </Flex>
  );
};
