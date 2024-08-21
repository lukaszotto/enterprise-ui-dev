import FizzBuzz from './examples/fizz-buzz';
import Counter from './examples/counter';
import CharacterSearch from './examples/character-search';
import SignUp from './examples/sign-up';
import ObstacleCourse from './examples/obstacle-course';
import TimeZone from './examples/time-zone';
import { WrappedPackingList } from './examples/packing-list';

const Application = () => {
  return (
    <main className="flex flex-col gap-8">
      <TimeZone getTodos />
      <FizzBuzz />
      <Counter />
      <CharacterSearch />
      <WrappedPackingList />
      <SignUp />
      <ObstacleCourse />
    </main>
  );
};

export default Application;
