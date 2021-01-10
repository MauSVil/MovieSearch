import React, { useEffect } from "react";
import DragAndDrop from "../components/DragAndDrop";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Typography } from "antd";
import { updateMovies } from "../store/moviesInfo/action";
import { connect } from "react-redux";
import "../styles/Home.css";

const Home = (props) => {
  const { updateMovies, actor } = props;
  const history = useHistory();

  const { Title } = Typography;

  useEffect(async () => {
    if (actor) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/person?api_key=30db1237b9167f8afaf9e065b90d16b8&language=en-US&page=1&include_adult=false&query=${actor}`
      );
      const {
        data: { results },
      } = response;
      updateMovies(
        results.filter(
          (el) => el.name === actor && el.known_for_department === "Acting"
        )[0]
      );
      history.push("/details");
    }
  }, [actor]);

  return (
    <div className="root">
      <Title>Quien es este actor?</Title>
      <div className="dnd">
        <DragAndDrop />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  actor: state.moviesInfo.actor,
});

export default connect(mapStateToProps, { updateMovies })(Home);
