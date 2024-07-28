import { render } from '$jsonresume-theme-even'
import resume from '../static/resume.json' with { type: 'json' }

export default function () {
  return render(resume)
}
