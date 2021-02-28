import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import {
  Upload,
  Button,
  Radio,
  message,
  Menu,
  Dropdown,
  Avatar,
  Input,
  Card,
  Modal,
} from "antd";
import Icon from "@ant-design/icons";
import "antd/dist/antd.css";
import "./index.css";
import axios from "axios";

import marketItems from "./MockData/marketItem";
import Token from "./Contract";
import Web3 from "web3";
// let web3;
// try {
//   const ethEnabled = () => {
//     if (window.ethereum) {
//       window.web3 = new Web3(window.ethereum);
//       web3 = window.web3;
//       window.ethereum.enable();
//       return true;
//     }
//     return false;
//   };
//   ethEnabled();
// } catch (err) {
//   alert("Please install Metamask first");
//   console.log(err);
//   //window.location = "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
// }
// const Contract = new web3.eth.Contract(Token.ABI, Token.address);
// window.Contract = Contract;
if (window.ethereum) {
  window.web3 = new Web3(window.ethereum);
  window.ethereum.enable();
}
try {
  var web3 = window.web3;
  var web3 = new Web3(web3.currentProvider);
} catch (err) {
  alert("Please install Metamask first");
  window.location =
    "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";
}
const Contract = web3.eth.contract(Token.ABI).at(Token.address);
window.Contract = Contract;

const modelFolder = "../../../ModelUpload_server/model/";
const { Meta } = Card;
const modelServer_ip =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8888"
    : "https://api.moleculestore.co";
const uploadServer_ip =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://upload.moleculestore.co";

const Search = Input.Search;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === "image/jpeg";
  if (!isJPG) {
    message.error("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJPG && isLt2M;
}
const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

class Market extends Component {
  constructor() {
    super();
    this.state = {
      category: [
        "Architecture",
        "Character",
        "Environment",
        "Vehicle",
        "Objects",
      ],
      subCategory: ["Door", "Window", "Wall", "Ceiling", "Floor", "Decoration"],
      loading: false,
      marketItems: [],
      ItemModal_visible: false,
      currentArticle3D: "",
    };
  }

  componentWillMount() {
    this.setState({ marketItems });
    // axios.get('https://al8duavehk.execute-api.us-west-1.amazonaws.com/test').then(d => {
    //   console.log(d.data)
    //   this.setState({ marketItems: d.data.result.Items })
    // })
  }
  componentDidMount() {
    // web3.eth.getAccounts(function (e, r) {
    //   if (!e) console.log(r);
    //   window.r = r;
    // })

    this.resize_titleImg();
  }

  getImgSize(imgSrc, callback) {
    var newImg = new Image();

    newImg.onload = function () {
      var height = newImg.height;
      var width = newImg.width;
      callback(width, height);
    };
    newImg.src = imgSrc; // this must be done AFTER setting onload
  }

  resize_titleImg() {
    setTimeout(() => {
      document.querySelectorAll(".ant-card-cover img").forEach((ele) => {
        this.getImgSize(ele.src, (width, height) => {
          if (height > width) {
            console.log(ele);
            let w = 197;
            let ratio = width / height;
            console.log(ratio);
            ele.setAttribute(
              "style",
              `width: ${w * ratio}px; height: ${w}px;margin: 0 auto;`
            );
          } else if (width === height) {
            ele.setAttribute(
              "style",
              `width: 137px; height: 137px;margin: 0 auto;`
            );
          } else {
            //console.log(ele)
            let h = 197;
            let ratio = height / width;
            ele.setAttribute(
              "style",
              `width: ${h}px; height: ${h * ratio}px;margin: 0 auto;`
            );
          }
        });
      });
    }, 0);
  }
  buy() {
    if (web3.eth.accounts.length === 0) {
      alert("Please install Metamask first.");
      return;
    }
    Contract.buy(
      {
        from: web3.eth.accounts[0],
        gas: 35940,
        value: web3.toWei("0.1", "ether"),
      },
      function (e, r) {
        if (!e) console.log(r);
      }
    );
  }

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <div>
        <div style={{ marginTop: "40px" }}>
          <div
            style={{
              display: "flex",
              margin: "50px",
              flexWrap: "wrap",
              marginTop: "-20px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ marginTop: "20px" }}>Blockchain Marketplace</div>
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: "10px", marginTop: "20px" }}>
                <Button type="dashed">Market</Button>
              </div>
              <div style={{ marginRight: "10px", marginTop: "20px" }}>
                <Button
                  onClick={() => this.props.history.push("/")}
                  type="dashed"
                >
                  Projects
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginLeft: "50px",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <div className="uploadContainer">
            <div
              onClick={() => {
                this.setState({ uploadModal_visible: true }, () => {
                  setTimeout(() => {
                    document
                      .querySelector("#uploadBtn")
                      .addEventListener("click", (e) => {
                        var formElement = document.querySelector("#uploadForm");
                        if (
                          !document.querySelector("#uploadForm").thumbnail.value
                        ) {
                          alert("Please add thumbnail");
                          return;
                        }
                        if (
                          !document.querySelector("#uploadForm").model.value
                        ) {
                          alert("Please add 3D model");
                          return;
                        }
                        if (!document.querySelector("#uploadForm").title) {
                          alert("Please add title");
                          return;
                        }
                        var formData = new FormData(formElement);
                        var request = new XMLHttpRequest();

                        function updateProgress(evt) {
                          if (evt.lengthComputable) {
                            // evt.loaded the bytes the browser received
                            // evt.total the total bytes set by the header
                            // jQuery UI progress bar to show the progress on screen
                            var percentComplete =
                              (evt.loaded / evt.total) * 100;
                            console.log(percentComplete);
                            //('#progressbar').progressbar("option", "value", percentComplete);
                          }
                        }
                        request.onprogress = updateProgress;
                        request.open("POST", `${uploadServer_ip}/upload`);
                        // request.upload.addEventListener('progress', function(e) {
                        //   if (e.lengthComputable) {
                        //     console.log(e)
                        //   }
                        //   }, false);
                        // request.upload.onprogress = function (event) {
                        //     console.log(event)
                        // }
                        request.send(formData);
                        request.onreadystatechange = function () {
                          if (this.readyState == 4 && this.status == 200) {
                            alert(this.responseText);
                            window.location.reload();
                          }
                        };
                      });
                  }, 1000);
                });
              }}
              className="uploadBtn"
            >
              <i className="anticon anticon-plus"></i>
              Upload
            </div>
          </div>
          <div style={{ width: "400px", lineHeight: "60px" }}>
            <Search
              placeholder="input search text"
              onSearch={(value) => console.log(value)}
              enterButton
            />
          </div>
          <div
            style={{
              lineHeight: "50px",
              marginRight: "50px",
              minWidth: "100px",
            }}
          >
            <Icon type="shopping-cart" />
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
                <span></span> 0 Items <Icon type="down" />
              </a>
            </Dropdown>
          </div>
        </div>
        <div
          style={{
            margin: "50px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          {this.state.marketItems.map((item) => (
            <div
              className="card"
              style={{ marginLeft: "20px", marginTop: "40px" }}
            >
              <Card
                onClick={() =>
                  this.setState({
                    ItemModal_visible: true,
                    currentArticle3D: `${item.itemName}/${item.modelName}`,
                  })
                }
                // loading
                hoverable
                style={{ width: 300, height: 250, overflow: "scroll" }}
                cover={
                  <img
                    alt="example"
                    src={
                      `${modelServer_ip}/model/` +
                      item.itemName +
                      "/" +
                      item.thumbnail
                    }
                  />
                }
              >
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={item.title}
                  description={item.description}
                />
                <div style={{ marginTop: "10px", marginLeft: "50px" }}>
                  <p style={{ marginBottom: 0 }} className="price">
                    Price: Ξ 20
                  </p>
                  <p>Author: John Doe</p>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <Modal
          title={this.state.currentArticle3D}
          visible={this.state.ItemModal_visible}
          onOk={() => this.setState({ ItemModal_visible: false })}
          onCancel={() => this.setState({ ItemModal_visible: false })}
        >
          <div style={{ height: "600px", width: "600px" }}>
            <iframe
              src={`${modelServer_ip}/webgl_loader_fbx.html?ele=${this.state.currentArticle3D}`}
            >
              <p>Your browser does not support iframes.</p>
            </iframe>
            <div>
              <Button onClick={() => this.buy()}>Buy</Button>
            </div>
          </div>
        </Modal>

        <Modal
          title="Upload"
          onCancel={() => this.setState({ uploadModal_visible: false })}
          visible={this.state.uploadModal_visible}
          footer={[
            <Button
              id="uploadBtn"
              key="submit"
              type="primary"
              loading={this.state.uploading}
              onClick={this.handleOk}
            >
              Submit
            </Button>,
          ]}
        >
          <div style={{ height: "400px", width: "1200px" }}>
            <form id="uploadForm" method="POST" encType="multipart/form-data">
              <input
                style={{ border: "1px solid black" }}
                placeholder="Product name"
                type="text"
                name="title"
              />
              <br />
              <br />
              <textarea
                style={{ width: "300px" }}
                name="description"
                placeholder="description"
              ></textarea>
              <br />
              <span>Price in</span>{" "}
              <select name="currency">
                <option>USD</option>
              </select>{" "}
              <input
                style={{ border: "1px solid black" }}
                type="number"
                name="price"
                placeholder="Price"
              />
              <br />
              <br />
              <span>Average Market Price</span>
              <input defaultValue="$15.00" />
              <br />
              <br />
              <div style={{ display: "flex" }}>
                <select name="Category">
                  <option>Category</option>
                  {this.state.category.map((i) => (
                    <option>{i}</option>
                  ))}
                </select>
                <select name="SubCategory">
                  <option>SubCategory</option>
                  {this.state.subCategory.map((i) => (
                    <option>{i}</option>
                  ))}
                </select>
                <select>
                  <option>Classfication</option>
                </select>
              </div>
              <br />
              <div>Thumbnail</div>
              <input type="file" name="thumbnail" />
              <br />
              <br />
              <br />
              <div>3D File (GLTF, GLB, FBX, OBJ)</div>
              <input type="file" name="model" />
              <br />
              {/* <input type="file" name="filefield" /><br /> */}
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Market);
