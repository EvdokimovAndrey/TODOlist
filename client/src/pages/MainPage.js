import React from "react";
import TaskTable from "../components/TaskTable";
import Container from 'react-bootstrap/Container';
import { observer } from "mobx-react-lite";

const MainPage = observer(() => {
  return (
    <div>
      <Container>
        <TaskTable />
      </Container>
    </div>
  );
});

export default MainPage;