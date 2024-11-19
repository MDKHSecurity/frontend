<script>
    import { PUBLIC_BASE_URL } from "$env/static/public";
    export let jwt;
    export let show = false;
    export let close = () => {};
  
    let step = 1;
  
    let courseData = {
        courseName: "",
        selectedVideos: [], 
        selectedQuizzes: [] 
    };
  
    let videos; 
    let quizzes; 
  
    const fetchVideos = async () => {
        try {
            const response = await fetch(`${PUBLIC_BASE_URL}api/videos`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${jwt}`
                }
            });
  
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
  
            videos = await response.json(); 
            console.log("Fetched videos:", videos);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };
  
    const fetchQuizzes = async () => {
        try {
            const response = await fetch(`${PUBLIC_BASE_URL}api/quizzes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${jwt}`
                }
            });
  
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
  
            quizzes = await response.json();
            console.log("Fetched quizzes:", quizzes);
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        }
    };
  
    $: if (show) {
        fetchVideos();
        fetchQuizzes();
    }
  
    const goToNextStep = () => {
        if (step < 4) step++;
    };
  
    const goToPreviousStep = () => {
        if (step > 1) step--;
    };
  
    const handleVideoSelection = (videoId) => {
        if (!courseData.selectedVideos.includes(videoId)) {
            courseData.selectedVideos = [...courseData.selectedVideos, videoId];
        } else {
            courseData.selectedVideos = courseData.selectedVideos.filter((id) => id !== videoId);
        }
    };
  
    const handleQuizSelection = (quizId) => {
        if (!courseData.selectedQuizzes.includes(quizId)) {
            courseData.selectedQuizzes = [...courseData.selectedQuizzes, quizId];
        } else {
            courseData.selectedQuizzes = courseData.selectedQuizzes.filter((id) => id !== quizId);
        }
    };
  
    const handleSubmit = async () => {
        console.log("Submitting course data", courseData);
        await fetch(`${PUBLIC_BASE_URL}api/course`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify(courseData)
        });
        console.log("Submitted data:", courseData);
        close();
    };
  
    const getVideoNames = (ids) => ids.map((id) => videos.find((v) => v.id === id)?.video_name || "Unknown").join(", ");
    const getQuizNames = (ids) => ids.map((id) => quizzes.find((q) => q.id === id)?.quiz_name || "Unknown").join(", ");
  </script>
  

  {#if show}
  <div class="backdrop" on:click={close}>
      <div class="modal" on:click|stopPropagation>
          <slot></slot>

          <!-- Step Content -->
          {#if step === 1}
              <h2>Please choose a name for the course</h2>
              <input
                  type="text"
                  placeholder="Enter course name"
                  bind:value={courseData.courseName}
              />
          {/if}

          {#if step === 2}
              <h2>Select Videos</h2>
              {#each videos as video}
                  <div>
                      <input
                          type="checkbox"
                          id={video.id}
                          on:change={() => handleVideoSelection(video.id)}
                          checked={courseData.selectedVideos.includes(video.id)}
                      />
                      <label for={video.id}>{video.video_name}</label>
                  </div>
              {/each}
          {/if}

          {#if step === 3}
              <h2>Select Quizzes</h2>
              {#each quizzes as quiz}
                  <div>
                      <input
                          type="checkbox"
                          id={quiz.id}
                          on:change={() => handleQuizSelection(quiz.id)}
                          checked={courseData.selectedQuizzes.includes(quiz.id)}
                      />
                      <label for={quiz.id}>{quiz.quiz_name}</label>
                  </div>
              {/each}
          {/if}

          {#if step === 4}
              <h2>Review and Submit</h2>
              <p><strong>Course Name:</strong> {courseData.courseName}</p>
              <p><strong>Selected Videos:</strong> {getVideoNames(courseData.selectedVideos)}</p>
              <p><strong>Selected Quizzes:</strong> {getQuizNames(courseData.selectedQuizzes)}</p>
          {/if}

          <!-- Navigation Buttons -->
          <div class="navigation">
              {#if step > 1}
                  <button on:click={goToPreviousStep}>Previous</button>
              {/if}
              {#if step < 4}
                  <button on:click={goToNextStep}>Next</button>
              {/if}
              {#if step === 4}
                  <button on:click={handleSubmit}>Submit</button>
              {/if}
              <button class="close-button" on:click={close}>Close</button>
          </div>
      </div>
  </div>
{/if}


<style>
  .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .modal {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      position: relative;
      width: 400px;
      text-align: center;
  }
  .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      font-size: 1rem;
      cursor: pointer;
  }
  .navigation {
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
  }
</style>
