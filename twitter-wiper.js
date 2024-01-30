// credit for the main functionality for unliking non-broken pots goes to https://gist.github.com/aymericbeaumet/d1d6799a1b765c3c8bc0b675b1a1547d
// Note: I am not a great JS dev, so if the script moves from a BROKEN liked post to an unbroken one, then the script might bug out or stop and need to be rerun
// BROKEN LIKES are likes that appear under your "Likes" tab, but do not have a red heart. Not sure why they exist. Twitter is just bad like that. 
// Please help me make it so my script doesn't break :<

function nextUnlike() {
  return document.querySelector('[data-testid="unlike"]')
}

function nextLike() {
  return document.querySelector('[data-testid="like"]')
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function removeAll() {
  let count = 0
  let next = nextUnlike()
  while (next) {
    next.focus()
    next.click()
    next.setAttribute("data-testid", "fixed")
    console.log(`Unliked ${++count} tweets`)
    await wait(count % 50 === 0 ? 30000 : 2000)
    next = nextUnlike()
  }
  console.log('Out of unlikes, count =', count)
}

async function removeAllBroken() {
  await removeAll();
  let count = 0
  let next = nextLike()
  while (next) {
    next.focus()
    next.click()
    await new Promise(r => setTimeout(r, 2000));
    next.click()
    next.setAttribute("data-testid", "fixed")
    console.log(`Unliked ${++count} broken tweets`)
    await wait(count % 50 === 0 ? 30000 : 2000)
    next = nextLike()
  }
  console.log('Out of broken unlikes, count =', count)
}

removeAll()
removeAllBroken()
