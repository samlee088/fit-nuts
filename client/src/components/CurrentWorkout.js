/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {Jumbotron, Container, CardColumns, Card, Button} from 'react-bootstrap';

import {QUERY_ME} from '../utils/queries';
import {QUERY_WORKOUT} from '../utils/queries';
import {useMutation, useQuery} from '@apollo/client';
import Auth from '../utils/auth';
import DeleteButton from './DeleteButton';


const CurrentWorkout = ({dayOfTheWeek}) => {


  const {loading, data} = useQuery(QUERY_WORKOUT, {
    variables: { dayOfTheWeek },
  });
  
  // const {loading, error} = useMutation(REMOVE_WORKOUT)

  const userData = data?.me || {};
  console.log(data);
  console.log(userData);

  const [extraSets, setExtraSets] = useState(0);
  // on save button, pass through

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const increaseSet = async (currentSets) => {
    setExtraSets(extraSets + 1);
  };

  const decreaseSet = async (workoutId) => {};

  const increaseReps = async (workoutId) => {};

  const decreaseReps = async (workoutId) => {};

  return (
    <>
      <Container>
        <CardColumns>
          {data?.workout?.map((exercise) => {
            return (
              <Card key={exercise._id} border='dark'>
                <Card.Body>
                  <Card.Title>{exercise.exerciseName}</Card.Title>
                  <p className='small'>Weight: {exercise.weight}</p>
                  <Card.Text>{exercise.sets + extraSets}</Card.Text>
                  <Card.Text>{exercise.reps}</Card.Text>
                  <Card.Text>{exercise.other}</Card.Text>
                  <Button
                    className='btn-block btn-danger'
                    onClick={() => increaseSet(exercise.sets)}
                  >
                    Increase Set
                  </Button>
                  <Button
                    className='btn-block btn-danger'
                    onClick={() => decreaseSet(exercise.sets)}
                  >
                    Decrease Set
                  </Button>
                  <Button
                    className='btn-block btn-danger'
                    onClick={() => increaseReps(exercise.reps)}
                  >
                    Increase Reps
                  </Button>
                  <Button
                    className='btn-block btn-danger'
                    onClick={() => decreaseReps(exercise.reps)}
                  >
                    Decrease reps
                  </Button>
                  <DeleteButton />
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default CurrentWorkout;
