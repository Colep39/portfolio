import './App.css'

function App() {
  

  return (
    <div>
      <div className="navbar">
        <ul>
          <li>About</li>
          <li>Skills</li>
          <li>Projects</li>
          <li>Experience</li>
          <li>Contact</li>

        </ul>
      </div>

      <div className="hero">
        <div className="greeting">
          <h5>Hello there,</h5>
          <h1>I'm <span className="highlight">Cole</span></h1>
          <h3>I am a Full Stack Developer and Data Scientist!</h3>
          
        </div>

        <div className="hero-image">
          <img src="./public/programmer.png" alt="Cole's Image" className="programmer-image"/>
          <p><a href='https://pngtree.com/freepng/programmer-clipart-developer-sitting-behind-his-computer-in-glasses-cartoon-vector_11075227.html' className='credit'>png image from pngtree.com/</a></p>
        </div>

      </div>

      <div className="about-me">
          <h1>About Me</h1>
          <p>I am passionate about building functioning interactive web apps for users with high <strong>performance</strong>. I thrive in <strong>collaborative</strong> environments with teams to solve problems in ways to ensure mutual success.
            I love learning new <strong>technologies</strong> and <strong>languages</strong> for whatever task is at hand. 
          </p>
      </div>


    </div>
  )
}

export default App
