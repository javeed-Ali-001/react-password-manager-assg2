import {Component} from 'react'

import {v4} from 'uuid'

import './App.css'

const appLogo =
  'https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png'
const appLogoAltName = 'app logo'

const passwordManagerLg =
  'https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png'

const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png '

const userNameIcon =
  'https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png'

const passwordIcon =
  'https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png'

const searchLogo =
  'https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png'

const deleteImage =
  'https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png'

const starsIcons =
  'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    userAndPasswordList: [],
    websiteName: '',
    userName: '',
    password: '',
    showPassword: false,
    searchInput: '',
  }

  renderNoPasswordView = () => (
    <div className="no-password-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
        alt="no passwords"
        className="no-pass-img"
      />
      <h1 className="noPassText">No Passwords</h1>
    </div>
  )

  onDeleteItem = toCut => {
    const {userAndPasswordList} = this.state
    const newListAfterDel = userAndPasswordList.filter(
      eachItem => eachItem.id !== toCut,
    )
    this.setState({userAndPasswordList: newListAfterDel})
  }

  renderPasswordList = () => {
    const {userAndPasswordList, showPassword} = this.state

    return (
      <>
        <ul className="ul-container">
          {userAndPasswordList.map(eachItem => (
            <li
              className="password-and-etc-container"
              id={eachItem.id}
              key={eachItem.id}
            >
              <h1 className={`initial ${eachItem.bgColorForInitialValue}`}>
                {eachItem.initialValueOfWebsite}
              </h1>
              <div className="data-container">
                <p>{eachItem.website}</p>
                <p>{eachItem.username}</p>
                {showPassword && <p>{eachItem.passWord}</p>}
                {!showPassword && (
                  <img src={starsIcons} alt="stars" className="stars-img" />
                )}
              </div>
              <button
                onClick={() => this.onDeleteItem(eachItem.id)}
                type="button"
                className="del-btn"
              >
                <img
                  src={deleteImage}
                  data-testid="delete"
                  alt="delete"
                  className="del-img"
                />
              </button>
            </li>
          ))}
        </ul>
      </>
    )
  }

  onChangeCheckBox = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onChangeSearchInput = event => {
    const {searchInput, userAndPasswordList} = this.state
    this.setState({searchInput: event.target.value})
    const newList = userAndPasswordList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    this.setState({userAndPasswordList: newList})
  }

  renderBottomSection = () => {
    const {userAndPasswordList, searchInput} = this.state

    return (
      <div className="bottom-section2">
        <div className="password-count-search">
          <p className="heading">
            Your Passwords <span>{userAndPasswordList.length}</span>
          </p>

          <div className="search-input">
            <img src={searchLogo} className="input-img" alt="search" />
            <input
              type="search"
              className="search-element"
              placeholder="Search"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
          </div>
        </div>
        <hr className="hr-line" />

        <div className="checkbox-container">
          <input
            type="checkbox"
            className="check-box"
            id="check"
            onChange={this.onChangeCheckBox}
          />
          <label className="label" htmlFor="check">
            Show Passwords
          </label>
        </div>

        {userAndPasswordList.length === 0
          ? this.renderNoPasswordView()
          : this.renderPasswordList()}
      </div>
    )
  }

  onWebsite = event => {
    // const {websiteName} = this.state
    this.setState({websiteName: event.target.value})
    // console.log('onWebsite', websiteName)
  }

  onUserNAme = event => {
    // const {userName} = this.state
    this.setState({userName: event.target.value})
    // console.log('onUserName', userName)
  }

  onPassword = event => {
    // const {password} = this.state
    this.setState({password: event.target.value})
    // console.log('onPassword', password)
  }

  addContent = e => {
    e.preventDefault()
    const {websiteName, userName, password} = this.state
    const initialValue = websiteName.slice(0, 1).toUpperCase()
    const bgColorForInitial = colorList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: v4,
      username: userName,
      website: websiteName,
      passWord: password,
      initialValueOfWebsite: initialValue,
      bgColorForInitialValue: bgColorForInitial,
    }
    this.setState(prevState => ({
      userAndPasswordList: [...prevState.userAndPasswordList, newValues],
      userName: '',
      websiteName: '',
      password: '',
      searchInput: '',
      showPassword: true,
    }))
  }

  renderTopSection = () => {
    const {websiteName, userName, password, userAndPasswordList} = this.state
    console.log('list', userAndPasswordList)
    return (
      <div className="top-section2">
        <form className="form-container" onSubmit={this.addContent}>
          <h1 className="heading">Add New Password</h1>
          <div className="input-holder">
            <img src={websiteLogo} alt="website" className="input-img" />
            <input
              type="text"
              value={websiteName}
              className="input-element"
              placeholder="Enter Website"
              onChange={this.onWebsite}
            />
          </div>
          <div className="input-holder">
            <img src={userNameIcon} alt="Username" className="input-img" />
            <input
              type="text"
              value={userName}
              className="input-element"
              placeholder="Enter Username"
              onChange={this.onUserNAme}
            />
          </div>
          <div className="input-holder">
            <img src={passwordIcon} alt="password" className="input-img" />
            <input
              type="password"
              value={password}
              className="input-element"
              placeholder="Enter Password"
              onChange={this.onPassword}
            />
          </div>
          <button type="submit" className="add-btn">
            Add
          </button>
        </form>
        <img
          className="pass-img"
          src={passwordManagerLg}
          alt="password manager"
        />
      </div>
    )
  }

  render() {
    const {userAndPasswordList} = this.state
    console.log('renderList', userAndPasswordList)
    return (
      <div className="app-container">
        <div className="responsive-container">
          <img src={appLogo} className="logo-img" alt={appLogoAltName} />
          <div className="top-section">{this.renderTopSection()}</div>
          <div className="bottom-section">{this.renderBottomSection()}</div>
        </div>
      </div>
    )
  }
}

export default App

// const {websiteName, userName, password} = this.state
// console.log('list', websiteName, userName, password)
// colorList[bgColorForInitialValue]
