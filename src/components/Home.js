import React, { useState, useEffect } from 'react';
import './style/style.sass';
import { Container, Row, Col } from 'react-bootstrap';
import { getRequest, postRequest, deleteRequest } from './axiosclient/requests';
import SearchBar from './UI/SearchBar';
import Chart from './UI/Chart';
import FeatherIcon from 'feather-icons-react';
import Suggestions from './UI/Suggestions';
import { ConvertNumber, TimeAgo } from './util/function';
import randomcolor from 'randomcolor';


const Home = () => {
    const [searchText, setSearchText] = useState("");
    const [repo, setRepo] = useState([]);
    const [chartData, setChartData] = useState([]);
    
    const loadRepo = async () => {
        const url = 'http://localhost:3003/repos';
        const res = await getRequest(url);
        setRepo(res.data);
        let temp = [];
     
        res.data.forEach(element => {
            element.commit.forEach(c => {
                c.date = (new Date(c.date).getTime());
            })
            temp.push(element.commit)
            
        });

        setChartData(prevState=>{
            return [...prevState,...temp]
        });
    }
    
    useEffect(() => {
        loadRepo();
    }, [])

    const [result, setResult] = useState([]);

    const handleInputChange = async (e) => {
        setSearchText(e.target.value);
        if (e.target.value !== "") {
            const url = `https://api.github.com/search/repositories?q=${e.target.value}`;
            const res = await getRequest(url);
            setResult(res.data.items);
        }
        else if (e.target.value === "") {
            setResult([]);
        }
    }

    const handleSearch = async () => {
        const url = `https://api.github.com/search/repositories?q=${searchText}`;
        const res = await getRequest(url);
        setResult(res.data.items);
    }

    const handleRepoClick = async (item) => {
        setResult([]);
        setSearchText("");
        const url = `https://api.github.com/repos/${item.owner.login}/${item.name}/stats/code_frequency`;
        const res = await getRequest(url);
        if (res) {
            const posturl = 'http://localhost:3003/repos';
            let row = [];
            res.data?.map((com, i) => {
                row.push({ name: item.name, commit: com[1], date: new Date(com[0] * 1000).toISOString() })
            })
            var color = randomcolor();
            item.commit = row;
            item.color = color;
            const postres = await postRequest(posturl, item);
            if (postres) {
                loadRepo();
            }
        }
    }

    const handleRepoDelete = async (id) => {
        const url = `http://localhost:3003/repos/${id}`;
        const res = await deleteRequest(url);
        if (res) {
            loadRepo();
        }
    }

    return (
        <Container className="p-5">
            <Row style={{ borderRadius: "6px", overflow: "hidden" }}>
                <Col md={7} className="graph-col">
                    <div className="chart-box">
                        <Chart data={chartData} repo={repo} />
                    </div>
                </Col>
                <Col md={5} className="search-col">
                    <SearchBar
                        value={searchText}
                        inputChange={(e) => handleInputChange(e)}
                        handleSubmit={handleSearch}
                    />
                    {result.length > 0 && (
                        <Suggestions data={result}
                            repoClick={(item) => handleRepoClick(item)}
                        />
                    )}
                    {repo.length === 0 ? (
                        <div className="search-info">
                            <FeatherIcon icon="search" size={40} className="mb-4" />
                            <h6>Search for a GitHub repository to populate graph.</h6>
                        </div>
                    ) : (<div className="repolist">
                        {repo.map((item, i) => (
                            <div className="repoCard" style={{borderColor: item.color}}>
                                <h4 style={{ marginBottom: "0px", fontSize: "18px" }}><span style={{ color: "#7878a7" }}>{item.name}</span> / {item.owner.login}</h4>
                                <p style={{ fontSize: "13px", margin: "0" }}>
                                    <span style={{ marginRight: "10px" }}><FeatherIcon icon="star" size={10} style={{ verticalAlign: "unset", marginRight: "2px" }} />{ConvertNumber(item.forks, 0)}</span>
                                    Updated on {TimeAgo(new Date(item.updated_at))} ago
                                </p>
                                <FeatherIcon icon="trash-2" size={20} onClick={() => handleRepoDelete(item.id)} />
                            </div>
                        ))}
                    </div>)}
                </Col>
            </Row>
        </Container>
    )
}

export default Home;