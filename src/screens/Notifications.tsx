import React from 'react'
import {View} from 'react-native'
import {Text} from 'react-native-paper'
import BottomSheet from '../components/BottomSheetModal'
import {Button} from '../components/Button'

const App = () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <View className='flex-1 bg-white p-4'>
      <Button title='Show' onPress={() => setVisible(true)} />

      <BottomSheet visible={visible} onDismiss={() => {}} closeFn={() => setVisible(false)}>
        <View className='rounded-t-3xl bg-white p-5 pt-5'>
          <View
            style={{
              height: 5,
              width: '20%',
              borderRadius: 100,
              alignSelf: 'center',
              backgroundColor: '#E0E0E0',
              marginTop: 5,
            }}
          />
          <Text className='text-red-500'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam minus qui rem est iusto quo architecto
            vitae aliquam, dolor corrupti labore, eligendi neque blanditiis dolorum dolorem nam esse pariatur
            temporibus! Aut molestias facere velit dicta tempora pariatur illo corrupti voluptatum dignissimos!
            Repudiandae a deserunt ab? Vero, sapiente corporis dolorem id laudantium itaque est? Sunt voluptatum quae
            iusto commodi perferendis quam, nostrum sed ullam unde quasi nam quibusdam iure. Et debitis aspernatur
            ipsum. Eos deleniti aliquid reiciendis officia quod asperiores accusantium, optio sapiente consequuntur ut
            voluptatibus tempore voluptate facilis culpa quidem dolor, dolore incidunt, suscipit corrupti earum nam modi
            illo. Quis illo inventore, minima dolor magni incidunt laborum mollitia saepe libero nulla optio unde
            exercitationem architecto? Facere vel earum illo dolorum natus distinctio molestias iusto repudiandae harum
            nihil ullam quam fuga minus laudantium, nam corrupti placeat atque dolor rerum numquam, iste corporis.
            Repellat quidem voluptate accusamus reiciendis explicabo amet at debitis libero? Molestias fugiat reiciendis
            amet, obcaecati voluptates ut adipisci esse, sequi eligendi dolorem voluptatibus exercitationem repellat qui
            sed fugit itaque rem id saepe dolor. Facere optio odit consequatur natus est id, nostrum incidunt aliquid
            magnam. Recusandae incidunt consequuntur veritatis deleniti cum voluptate in similique! Provident,
            cupiditate harum. Consequuntur, ab necessitatibus? Eveniet corporis, earum maiores dolore necessitatibus
            ducimus dolores soluta, dolor beatae esse, repudiandae vitae sint numquam itaque ad impedit molestias!
            Repellendus similique temporibus voluptate, sint modi earum magnam ea cumque recusandae tenetur rem maiores
            dolor nostrum excepturi a animi sapiente odit laboriosam assumenda mollitia, provident molestiae accusamus!
            Eaque at totam cum, voluptas distinctio ratione doloribus mollitia eveniet obcaecati unde velit. Deleniti
            neque voluptates, mollitia eligendi vel, magni odit delectus autem rem reprehenderit quisquam doloribus
            nesciunt libero reiciendis perferendis! Sapiente ex fugiat consectetur illo eaque esse cum minima, sint ut
            vitae reiciendis? Voluptatum ullam, autem culpa perferendis est odit voluptatibus quia similique aut iste
            eius labore a explicabo quae facere amet. Cupiditate odit praesentium non labore, repellat optio explicabo
            eveniet. Sunt quod vel, ad voluptates natus in! Perferendis, fugit commodi facere repellendus vel iure est
            incidunt, unde beatae debitis ratione? Asperiores mollitia magnam odit laborum repellendus est dolore illum,
            illo dicta dolorem maiores, non ut, hic consectetur inventore id obcaecati rem necessitatibus aut. Tenetur
            necessitatibus reprehenderit quidem eaque debitis, rem aperiam possimus veniam earum, officia expedita
            aliquid accusamus tempora accusantium ullam. Minima, cupiditate incidunt laborum sint consequatur non illum
            facere totam provident aspernatur fugit delectus natus amet accusamus rerum et. Illum aperiam at est
            blanditiis dolorem cupiditate officia officiis consequatur molestias provident nam non amet quod quae
            necessitatibus eveniet libero asperiores eum rem, voluptatem maxime itaque, doloremque quasi odit!
            Blanditiis, officiis ullam necessitatibus maxime accusantium provident nostrum pariatur explicabo facilis
            quasi repellendus ipsum atque doloribus adipisci eius esse minima laboriosam delectus dolorum quo amet
            perferendis harum! Perspiciatis cupiditate error sequi, adipisci sunt eligendi! Tempora in nulla placeat
            cupiditate, enim perspiciatis illum quisquam, dolore eius fuga, neque quod incidunt reiciendis! Odio autem
            molestiae sed ut fugit! Quas nihil expedita est temporibus. Repellat, inventore, nobis nulla itaque, culpa
            nam consequuntur dicta beatae fuga laudantium ex excepturi iusto doloremque eaque perferendis. Deleniti
            quisquam ducimus accusantium? Vitae, reprehenderit obcaecati atque esse ut voluptates est aliquid!
            Voluptates enim obcaecati, eveniet aspernatur ipsam non, dolorem aut aliquam harum eligendi quod cumque sit
            quae quidem? Ut libero nostrum dicta necessitatibus consectetur perferendis ducimus voluptas labore,
            obcaecati perspiciatis iusto maxime saepe architecto iure molestiae ratione natus doloribus! Iusto
            architecto distinctio deleniti quaerat corporis laudantium consequuntur beatae minima? Similique velit porro
            sapiente, dolorem laboriosam quasi! Esse architecto harum blanditiis? Laudantium assumenda officiis ea
            molestias eius tempore ducimus, repudiandae accusamus, est, provident recusandae reiciendis harum. Voluptas
            nemo labore aliquam libero doloremque temporibus ea tenetur! Vel officiis ipsum ipsa repellat, repudiandae
            quod, quis rem beatae tempora officia, quaerat laborum quam! Illum distinctio quasi quam ipsa mollitia
            aspernatur expedita officiis, beatae ipsum unde veniam atque laboriosam, necessitatibus perspiciatis earum
            rerum cum eveniet sed. Placeat similique corporis odio corrupti provident quibusdam vel illum dignissimos!
            Eaque dignissimos deleniti praesentium tempora labore totam numquam voluptates? Dolorum sit eos labore
            repellat modi nobis! Mollitia repellendus tempore laborum natus enim eveniet dolores debitis voluptatem,
            obcaecati omnis iure voluptates soluta quibusdam minus quod qui animi itaque odit repudiandae eligendi
            possimus. Cum adipisci ad possimus inventore perspiciatis tenetur mollitia libero unde tempora! Aliquam
            harum quis quam iure natus? Similique voluptatem odio ut fugit dignissimos ab quas quae quibusdam qui
            doloremque libero explicabo eaque, fuga deleniti iusto, laboriosam aspernatur temporibus harum, quo sequi.
            Maiores asperiores quaerat temporibus neque odio. Nobis magni temporibus optio unde pariatur hic nihil,
            consequuntur repellat veniam expedita ex culpa reprehenderit ratione asperiores error quia aliquid vitae
            corporis nisi, qui possimus cum numquam ipsa. Animi modi fuga optio nobis eius expedita enim iste natus
            maxime maiores? Repudiandae modi magnam, tempora commodi veniam velit beatae debitis tenetur qui nisi,
            labore et, rem deleniti in earum sed! Nam ipsum quae magnam iste quod necessitatibus dignissimos cumque,
            impedit exercitationem maxime, veritatis quisquam numquam alias. Eveniet obcaecati doloribus optio
            aspernatur iure incidunt cum sit hic dicta culpa molestias quam assumenda quaerat numquam nisi, aut nesciunt
            eaque recusandae minus id pariatur. In distinctio vero, ipsa ea doloremque, animi temporibus sequi id, omnis
            rem odio cum quia aliquam. Quia est qui, eligendi iste fugiat sint architecto ducimus delectus! Architecto
            consequatur consectetur asperiores porro, quas, impedit sed minima culpa sequi iste suscipit quidem delectus
            accusamus unde doloremque hic ad id nesciunt natus repellat alias autem? Omnis repellendus magni magnam nisi
            et, sit odio praesentium maxime impedit quos eum? Impedit ullam voluptatibus dolore magni temporibus
            suscipit culpa, sint magnam. Inventore omnis consequatur impedit asperiores maxime sed tempora ab quia et
            aperiam rem, accusamus repudiandae error cumque sint, nostrum nam amet obcaecati optio distinctio? Molestiae
            nulla quod a totam illum. Recusandae minima porro dolorem impedit possimus provident, voluptate sequi amet
            fugit, necessitatibus ut neque unde architecto voluptatem eum ex assumenda, voluptatibus corporis. Maxime
            omnis possimus sunt eius harum similique, eum dolorum, libero molestiae, tempore neque? Repellendus quam eos
            aperiam molestias deleniti corporis iure, perspiciatis expedita et excepturi laudantium ipsa autem, dolor
            nesciunt id, ipsum laboriosam delectus maiores?
          </Text>
          <View className='h-96'>
            <Text className='text-red-500'>Content</Text>
          </View>
          <View className='h-96'>
            <Text className='text-red-500'>Content</Text>
          </View>
          <View className='h-96'>
            <Text className='text-red-500'>Content</Text>
          </View>
        </View>
      </BottomSheet>
    </View>
  )
}

export default App
