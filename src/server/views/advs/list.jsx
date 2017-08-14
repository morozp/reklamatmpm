const React = require('react');

class AdvsList extends React.Component {
    render() {
        const { advs } = this.props;
        return (
            <div className='advs-listing-page'>
                <div className='list-header'>
                    <h1> Все объявления</h1>
                </div>

                <table>
                    {advs.map((adv) => (
                        <tr key={adv.id}>
                            <td >
                                <strong>ID#{adv.id} </strong>
                                {adv.message}
                            </td>
                            <td>
                                {adv.description}
                            </td>
                            <td>
                                <a>Редактировать</a>|<a>Удалить</a>|<a>Опубликовать</a>|<a>Сделать невидимым</a>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>);
    }
}

module.exports = AdvsList;