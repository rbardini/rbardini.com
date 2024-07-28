import { gsap } from 'https://esm.sh/gsap@3.12.5'

class AnimatedAvatar extends HTMLElement {
  connectedCallback() {
    if (globalThis.matchMedia('(prefers-reduced-motion)').matches) return

    this.$avatar = this.firstElementChild
    this.$chest = this.$avatar.querySelector('.chest')
    this.$neck = this.$avatar.querySelector('.neck')
    this.$head = this.$avatar.querySelector('.head')
    this.$innerFace = this.$avatar.querySelector('.inner-face')
    this.$sclera = this.$avatar.querySelectorAll('.sclera')
    this.$iris = this.$avatar.querySelectorAll('.iris')
    this.$hair = this.$avatar.querySelector('.hair')
    this.$ears = this.$avatar.querySelector('.ears')
    this.$eyebrows = this.$avatar.querySelector('.eyebrows')

    globalThis.addEventListener('resize', this.onResize)
    globalThis.addEventListener('pointermove', this.onPointerMove)
    this.onResize()

    gsap.ticker.add(this.onTick)
    this.blink = gsap
      .timeline({ repeat: -1, repeatDelay: 5 })
      .to(this.$sclera, { duration: 0.01, opacity: 0 }, 0)
      .to(this.$sclera, { duration: 0.01, opacity: 1 }, 0.1)
  }

  disconnectedCallback() {
    globalThis.removeEventListener('resize', this.onResize)
    globalThis.removeEventListener('pointermove', this.onPointerMove)

    gsap.ticker.remove(this.onTick)
    this.blink.kill()
  }

  onResize = () => {
    const avatarRect = this.$avatar.getBoundingClientRect()
    this.origX = avatarRect.x + avatarRect.width / 2
    this.origY = avatarRect.y + avatarRect.height / 2

    const axisX = Math.max(this.origX, globalThis.innerWidth - this.origX)
    const axisY = Math.max(this.origY, globalThis.innerHeight - this.origY)

    this.mapX = gsap.utils.pipe(gsap.utils.clamp(-axisX, axisX), gsap.utils.mapRange(-axisX, axisX, -1, 1))
    this.mapY = gsap.utils.pipe(gsap.utils.clamp(-axisY, axisY), gsap.utils.mapRange(-axisY, axisY, -1, 1))
  }

  onPointerMove = (e) => {
    this.x = this.mapX(e.clientX - this.origX)
    this.y = this.mapY(e.clientY - this.origY)
  }

  onTick = () => {
    const { x, y } = this
    if (x === this.prevX && y === this.prevY) return

    gsap.to(this.$chest, { rotation: -x, transformOrigin: '50% 100%' })
    gsap.to(this.$neck, { xPercent: x * -1.5, yPercent: y * -5 })
    gsap.to(this.$head, { xPercent: x * 1.5, yPercent: y * 1.1, rotation: x * -4, transformOrigin: '50% 100%' })
    gsap.to(this.$innerFace, { xPercent: x * 2.5, yPercent: y * 2.5 })
    gsap.to(this.$iris, { xPercent: x * 25, yPercent: y * 25 })
    gsap.to(this.$hair, { xPercent: x * 0.5, yPercent: y * 0.5 })
    gsap.to(this.$ears, { yPercent: y * -15, xPercent: x * -0.8 })
    gsap.to(this.$eyebrows, { yPercent: y * 25 })

    this.prevX = x
    this.prevY = y
  }
}

customElements.define('animated-avatar', AnimatedAvatar)
