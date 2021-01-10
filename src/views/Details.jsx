import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Button, Image, Typography, Tag } from "antd";
import { ArrowLeftOutlined, StarFilled } from "@ant-design/icons";
import { updateActor, updateMovies } from "../store/moviesInfo/action";
import { connect } from "react-redux";
import "../styles/Details.css";

const Details = (props) => {
  const { actor, movies, updateActor, updateMovies } = props;
  const { Header, Sider, Content } = Layout;
  const { Title } = Typography;

  const history = useHistory();
  const returnHome = () => {
    history.push("/");
    updateActor("");
    updateMovies({});
  };

  useEffect(() => {
    if (!actor) {
      history.push("/");
    }
  }, []);

  const returnGender = (gender) => {
    switch (gender) {
      case 1:
        return "Mujer";
      case 2:
        return "Hombre";
    }
  };

  return movies.known_for ? (
    <Layout>
      <Header className="header">
        <Button type="primary" onClick={() => returnHome()}>
          <ArrowLeftOutlined />
          Regresar
        </Button>
      </Header>
      <Layout>
        <Sider width={300} theme="light" className="sider">
          <Image
            width={200}
            src={`https://image.tmdb.org/t/p/w500/${movies.profile_path}`}
          />
          <Title level={3}>{actor}</Title>
          <Tag color="#87d068" className="tag">
            {returnGender(movies.gender)}
          </Tag>
          <p>Popularidad: {movies.popularity}</p>
        </Sider>
        <Layout>
          <Content>
            <Title>Peliculas: </Title>
            {movies.known_for.map((el) => (
              <div className="movie">
                <div className="movieHeader">
                  <Title level={3}>{el.title}</Title>
                  <div className="average">
                    <Title
                      level={5}
                      className="averageText"
                    >{`${el.vote_average} / 10`}</Title>
                    <StarFilled style={{ color: "#d2ba14" }} />
                  </div>
                </div>
                <div className="movieContent">
                  <Image
                    width={205}
                    src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                  />
                  <div className="movieInfo">
                    <p>{el.overview}</p>
                    <Title level={5}>Fecha de estreno: {el.release_date}</Title>
                  </div>
                </div>
              </div>
            ))}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  ) : null;
};

const mapStateToProps = (state) => ({
  actor: state.moviesInfo.actor,
  movies: state.moviesInfo.movies,
});

export default connect(mapStateToProps, {
  updateActor,
  updateMovies,
})(Details);
