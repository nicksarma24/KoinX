import TeamMember1 from "./TeamMember1";
import TeamMember2 from "./TeamMember2";
import TeamMember3 from "./TeamMember3";
import { H2 } from "../shared/Typography";

const Team = () => {
  return (
    <section
      className="p-6 rounded-lg shadow-lg bg-white lg:w-4/5 w-full"
      id="team"
    >
      <H2 value="Team" />
      <p className="text-sm py-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div className="flex flex-col gap-4">
        <TeamMember1 />
        <TeamMember2 />
        <TeamMember3 />
        
      </div>
    </section>
  );
};

export default Team;
