import { initials } from '../utils/helpers'

export default function AvatarStack({ members = [], max = 3 }) {
  const colors = ['#7764e8', '#3bb7a4', '#eea252', '#e779a2']
  return (
    <div className="flex items-center">
      {members.slice(0, max).map((member, index) => (
        <div key={`${member}-${index}`} title={member} className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[9px] font-bold text-white" style={{ background: colors[index % colors.length], marginLeft: index ? -7 : 0 }}>
          {initials(member)}
        </div>
      ))}
      {members.length > max && <div className="ml-[-7px] flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#eeeafd] text-[9px] font-bold text-[#6652d4]">+{members.length - max}</div>}
    </div>
  )
}
